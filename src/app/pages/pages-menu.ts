import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Data',
    group: true,
  },
  {
    title: 'Maps',
    icon: 'nb-location',
    children: [
      {
        title: 'Country Data',
        link: '/pages/maps',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Statistics',
        link: '/pages/charts/d3',
      },
    ],
  },
];
