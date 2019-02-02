// To parse this data:
//
//   import { Convert, Log } from "./file";
//
//   const log = Convert.toLog(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Log {
    success: boolean;
    logs:    LogElement[];
    date:    Date;
}

export interface LogElement {
    _id:      string;
    action:   Action;
    payload:  boolean | PayloadClass | null | string;
    user_id?: string;
    date:     Date;
    __v:      number;
}

export enum Action {
    ChangeDate = "CHANGE_DATE",
    ChangeTab = "CHANGE_TAB",
    ClearFilter = "CLEAR_FILTER",
    Filter = "FILTER",
    Load = "LOAD",
    SelectCompany = "SELECT_COMPANY",
    ShowDashboard = "SHOW_DASHBOARD",
    ShowPortfolio = "SHOW_PORTFOLIO",
}

export interface PayloadClass {
    countryCode?: string[] | null;
    region?:      Region[] | null;
    sector?:      Sector[] | null;
    size?:        string[] | null;
    assetId?:     number;
    name?:        string;
}

export enum Region {
    Africa = "Africa",
    Asia = "Asia",
    CISBalticStates = "CIS/Baltic States",
    CentralAmerica = "Central America",
    Europe = "Europe",
    MiddleEast = "Middle East",
    NorthAmerica = "North America",
    PacificRim = "Pacific Rim",
    SouthAmerica = "South America",
}

export enum Sector {
    CommercialServices = "Commercial Services",
    Communications = "Communications",
    ConsumerDurables = "Consumer Durables",
    ConsumerNonDurables = "Consumer Non-Durables",
    ConsumerServices = "Consumer Services",
    DistributionServices = "Distribution Services",
    ElectronicTechnology = "Electronic Technology",
    EnergyMinerals = "Energy Minerals",
    Finance = "Finance",
    HealthServices = "Health Services",
    HealthTechnology = "Health Technology",
    IndustrialServices = "Industrial Services",
    Miscellaneous = "Miscellaneous",
    NonEnergyMinerals = "Non-Energy Minerals",
    ProcessIndustries = "Process Industries",
    ProducerManufacturing = "Producer Manufacturing",
    RetailTrade = "Retail Trade",
    TechnologyServices = "Technology Services",
    Transportation = "Transportation",
    Utilities = "Utilities",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export namespace Convert {
    export function toLog(json: string): Log {
        return cast(JSON.parse(json), r("Log"));
    }

    export function logToJson(value: Log): string {
        return JSON.stringify(uncast(value, r("Log")), null, 2);
    }

    function invalidValue(typ: any, val: any): never {
        throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
    }

    function jsonToJSProps(typ: any): any {
        if (typ.jsonToJS === undefined) {
            var map: any = {};
            typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
            typ.jsonToJS = map;
        }
        return typ.jsonToJS;
    }

    function jsToJSONProps(typ: any): any {
        if (typ.jsToJSON === undefined) {
            var map: any = {};
            typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
            typ.jsToJSON = map;
        }
        return typ.jsToJSON;
    }

    function transform(val: any, typ: any, getProps: any): any {
        function transformPrimitive(typ: string, val: any): any {
            if (typeof typ === typeof val) return val;
            return invalidValue(typ, val);
        }

        function transformUnion(typs: any[], val: any): any {
            // val must validate against one typ in typs
            var l = typs.length;
            for (var i = 0; i < l; i++) {
                var typ = typs[i];
                try {
                    return transform(val, typ, getProps);
                } catch (_) {}
            }
            return invalidValue(typs, val);
        }

        function transformEnum(cases: string[], val: any): any {
            if (cases.indexOf(val) !== -1) return val;
            return invalidValue(cases, val);
        }

        function transformArray(typ: any, val: any): any {
            // val must be an array with no invalid elements
            if (!Array.isArray(val)) return invalidValue("array", val);
            return val.map(el => transform(el, typ, getProps));
        }

        function transformDate(typ: any, val: any): any {
            if (val === null) {
                return null;
            }
            const d = new Date(val);
            if (isNaN(d.valueOf())) {
                return invalidValue("Date", val);
            }
            return d;
        }

        function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
            if (val === null || typeof val !== "object" || Array.isArray(val)) {
                return invalidValue("object", val);
            }
            var result: any = {};
            Object.getOwnPropertyNames(props).forEach(key => {
                const prop = props[key];
                const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
                result[prop.key] = transform(v, prop.typ, getProps);
            });
            Object.getOwnPropertyNames(val).forEach(key => {
                if (!Object.prototype.hasOwnProperty.call(props, key)) {
                    result[key] = transform(val[key], additional, getProps);
                }
            });
            return result;
        }

        if (typ === "any") return val;
        if (typ === null) {
            if (val === null) return val;
            return invalidValue(typ, val);
        }
        if (typ === false) return invalidValue(typ, val);
        while (typeof typ === "object" && typ.ref !== undefined) {
            typ = typeMap[typ.ref];
        }
        if (Array.isArray(typ)) return transformEnum(typ, val);
        if (typeof typ === "object") {
            return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
                : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
                : invalidValue(typ, val);
        }
        // Numbers can be parsed by Date but shouldn't be.
        if (typ === Date && typeof val !== "number") return transformDate(typ, val);
        return transformPrimitive(typ, val);
    }

    function cast<T>(val: any, typ: any): T {
        return transform(val, typ, jsonToJSProps);
    }

    function uncast<T>(val: T, typ: any): any {
        return transform(val, typ, jsToJSONProps);
    }

    function a(typ: any) {
        return { arrayItems: typ };
    }

    function u(...typs: any[]) {
        return { unionMembers: typs };
    }

    function o(props: any[], additional: any) {
        return { props, additional };
    }

    function m(additional: any) {
        return { props: [], additional };
    }

    function r(name: string) {
        return { ref: name };
    }

    const typeMap: any = {
        "Log": o([
            { json: "success", js: "success", typ: true },
            { json: "logs", js: "logs", typ: a(r("LogElement")) },
            { json: "date", js: "date", typ: Date },
        ], false),
        "LogElement": o([
            { json: "_id", js: "_id", typ: "" },
            { json: "action", js: "action", typ: r("Action") },
            { json: "payload", js: "payload", typ: u(true, r("PayloadClass"), null, "") },
            { json: "user_id", js: "user_id", typ: u(undefined, "") },
            { json: "date", js: "date", typ: Date },
            { json: "__v", js: "__v", typ: 0 },
        ], false),
        "PayloadClass": o([
            { json: "countryCode", js: "countryCode", typ: u(undefined, u(a(""), null)) },
            { json: "region", js: "region", typ: u(undefined, u(a(r("Region")), null)) },
            { json: "sector", js: "sector", typ: u(undefined, u(a(r("Sector")), null)) },
            { json: "size", js: "size", typ: u(undefined, u(a(""), null)) },
            { json: "assetId", js: "assetId", typ: u(undefined, 0) },
            { json: "name", js: "name", typ: u(undefined, "") },
        ], false),
        "Action": [
            "CHANGE_DATE",
            "CHANGE_TAB",
            "CLEAR_FILTER",
            "FILTER",
            "LOAD",
            "SELECT_COMPANY",
            "SHOW_DASHBOARD",
            "SHOW_PORTFOLIO",
        ],
        "Region": [
            "Africa",
            "Asia",
            "CIS/Baltic States",
            "Central America",
            "Europe",
            "Middle East",
            "North America",
            "Pacific Rim",
            "South America",
        ],
        "Sector": [
            "Commercial Services",
            "Communications",
            "Consumer Durables",
            "Consumer Non-Durables",
            "Consumer Services",
            "Distribution Services",
            "Electronic Technology",
            "Energy Minerals",
            "Finance",
            "Health Services",
            "Health Technology",
            "Industrial Services",
            "Miscellaneous",
            "Non-Energy Minerals",
            "Process Industries",
            "Producer Manufacturing",
            "Retail Trade",
            "Technology Services",
            "Transportation",
            "Utilities",
        ],
    };
}
