import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ContextualMenuBasicExample } from './examples/ContextualMenu.Basic.Example';
import { ContextualMenuIconExample } from './examples/ContextualMenu.Icon.Example';
import { ContextualMenuSectionExample } from './examples/ContextualMenu.Section.Example';
import { ContextualMenuSubmenuExample } from './examples/ContextualMenu.Submenu.Example';
import { ContextualMenuCustomizationWithNoWrapExample } from './examples/ContextualMenu.CustomizationWithNoWrap.Example';
import { ContextualMenuCheckmarksExample } from './examples/ContextualMenu.Checkmarks.Example';
import { ContextualMenuDirectionalExample } from './examples/ContextualMenu.Directional.Example';
import { ContextualMenuCustomizationExample } from './examples/ContextualMenu.Customization.Example';
import { ContextualMenuWithScrollBarExample } from './examples/ContextualMenu.ScrollBar.Example';
import { ContextualMenuWithCustomMenuItemExample } from './examples/ContextualMenu.CustomMenuItem.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ContextualMenuStatus } from './ContextualMenu.checklist';

const ContextualMenuBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Basic.Example.tsx') as string;
const ContextualMenuIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Icon.Example.tsx') as string;
const ContextualMenuSectionExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Section.Example.tsx') as string;
const ContextualMenuSubmenuExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Submenu.Example.tsx') as string;
const ContextualMenuCheckmarksExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Checkmarks.Example.tsx') as string;
const ContextualMenuDirectionalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Directional.Example.tsx') as string;
const ContextualMenuCustomizationExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Customization.Example.tsx') as string;
const ContextualMenuWithScrollBarExampleCode = require
  ('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.ScrollBar.Example.tsx') as string;
const ContextualMenuWithCustomMenuItemExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.CustomMenuItem.Example.tsx') as string;

export class ContextualMenuPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='ContextualMenu'
        componentName='ContextualMenuExample'
        exampleCards={
          <div>
            <ExampleCard
              title='Default ContextualMenu'
              code={ ContextualMenuBasicExampleCode }
            >
              <ContextualMenuBasicExample />
            </ExampleCard>
            <ExampleCard
              title='ContextualMenu with icons'
              code={ ContextualMenuIconExampleCode }
            >
              <ContextualMenuIconExample />
            </ExampleCard>
            <ExampleCard
              title='ContextualMenu with submenus'
              code={ ContextualMenuSubmenuExampleCode }
            >
              <ContextualMenuSubmenuExample />
            </ExampleCard>
            <ExampleCard
              title='ContextualMenu with section headers'
              code={ ContextualMenuSectionExampleCode }
            >
              <ContextualMenuSectionExample />
            </ExampleCard>
            <ExampleCard
              title='ContextualMenu with checkable menu items and toggable split button'
              code={ ContextualMenuCheckmarksExampleCode }
            >
              <ContextualMenuCheckmarksExample />
            </ExampleCard>
            <ExampleCard
              title='ContextualMenu with beak and directional settings'
              code={ ContextualMenuDirectionalExampleCode }
            >
              <ContextualMenuDirectionalExample />
            </ExampleCard>
            <ExampleCard
              title='ContextualMenu with customized submenus'
              code={ ContextualMenuCustomizationExampleCode }
            >
              <ContextualMenuCustomizationExample />
            </ExampleCard>
            <ExampleCard
              title='ContextualMenu with customized submenus and noWrap attributes'
              code={ ContextualMenuSubmenuExampleCode }
            >
              <ContextualMenuCustomizationWithNoWrapExample />
            </ExampleCard>
            <ExampleCard
              title='ContextualMenu with a scroll bar and fixed direction'
              code={ ContextualMenuWithScrollBarExampleCode }
            >
              <ContextualMenuWithScrollBarExample />
            </ExampleCard>
            <ExampleCard
              title='ContextualMenu with custom rendered menu items'
              code={ ContextualMenuWithCustomMenuItemExampleCode }
            >
              <ContextualMenuWithCustomMenuItemExample />
            </ExampleCard>

          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/ContextualMenu.types.ts'),
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Callout/Callout.types.ts'),
            ] }
          />
        }
        overview={
          <div>
            <p>
              ContextualMenus are lists of commands that are based on the context of selection, mouse hover or keyboard focus. They are one of the most effective and highly used command surfaces, and can be used in a variety of places.
            </p>
            <p>
              There are variants that originate from a command bar, or from cursor or focus. Those that come from CommandBars use a beak that is horizontally centered on the button. Ones that come from right click and menu button do not have a beak, but appear to the right and below the cursor. ContextualMenus can have submenus from commands, show selection checks, and icons.
            </p>
            <p>
              Organize commands in groups divided by rules. This helps users remember command locations, or find less used commands based on proximity to others. One should also group sets of mutually exclusive or multiple selectable options. Use icons sparingly, for high value commands, and don’t mix icons with selection checks, as it makes parsing commands difficult. Avoid submenus of submenus as they can be difficult to invoke or remember.
            </p>
          </div>
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Use to display commands.</li>
              <li>Divide groups of commands with rules.</li>
              <li>Use selection checks without icons.</li>
              <li>Provide submenus for sets of related commands that aren’t as critical as others.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use them to display content.</li>
              <li>Show commands as one large group.</li>
              <li>Mix checks and icons.</li>
              <li>Create submenus of submenus.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...ContextualMenuStatus }
          />
        }
      />
    );
  }
}
