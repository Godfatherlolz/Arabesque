import { D3PieComponent } from "./d3-pie.component";
import { NbThemeService, NbMediaBreakpointsService } from "@nebular/theme";
import { of as observableOf } from 'rxjs';
import { NbJSThemeOptions } from "@nebular/theme/services/js-themes/theme.options";
import { NbJSThemesRegistry } from "@nebular/theme/services/js-themes-registry.service";
describe("Testing Pie D3 Pie chart", () => {
    it("should component be created", () => {
        const themeOptions: NbJSThemeOptions = { name: "corporate" }
        const breakPoint = new NbMediaBreakpointsService([]);
        const jsTheme = new NbJSThemesRegistry([], []);
        const themeService = new NbThemeService(themeOptions, breakPoint, jsTheme);
        let component = new D3PieComponent(themeService);
        expect(component).toBeTruthy();
    });
    it("should result array not be empty", () => {
        const values = [
            { name: "Test1", value: 5 }
        ];
        const themeOptions: NbJSThemeOptions = { name: "corporate" }
        const breakPoint = new NbMediaBreakpointsService([]);
        const jsTheme = new NbJSThemesRegistry([], []);
        const themeService = new NbThemeService(themeOptions, breakPoint, jsTheme);
        let component = new D3PieComponent(themeService);
        component.results = values;
        expect(component.results.length).toBeGreaterThan(0);
    });

    it("should 1 = 1", () => {
        let x = 1;
        expect(x).toEqual(1);
    })
});