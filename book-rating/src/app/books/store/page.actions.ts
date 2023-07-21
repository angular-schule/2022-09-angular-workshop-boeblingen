import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const PageActions = createActionGroup({
  source: 'Page',
  events: {
    'Ready': emptyProps()
  }
});
