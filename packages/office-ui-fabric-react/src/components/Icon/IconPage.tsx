import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { IconBasicExample } from './examples/Icon.Basic.Example';
import { IconSvgExample } from './examples/Icon.Svg.Example';
import { IconColorExample } from './examples/Icon.Color.Example';
import { IconImageSheetExample } from './examples/Icon.ImageSheet.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { IconStatus } from './Icon.checklist';

const IconBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Icon/examples/Icon.Basic.Example.tsx') as string;
const IconSvgExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Icon/examples/Icon.Svg.Example.tsx') as string;
const IconColorExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Icon/examples/Icon.Color.Example.tsx') as string;
const IconImageSheetExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Icon/examples/Icon.ImageSheet.Example.tsx') as string;

export class IconPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Icon'
        componentName='IconExample'
        exampleCards={
          <div>
            <ExampleCard title='Icon' code={ IconBasicExampleCode }>
              <IconBasicExample />
            </ExampleCard>
            <ExampleCard title='Icon with custom color' code={ IconColorExampleCode }>
              <IconColorExample />
            </ExampleCard>
            <ExampleCard title='Icon using custom svg' code={ IconSvgExampleCode }>
              <IconSvgExample />
            </ExampleCard>
            <ExampleCard title='Icon using image sheet' code={ IconImageSheetExampleCode }>
              <IconImageSheetExample />
            </ExampleCard>
          </div>
        }
        allowNativeProps={ true }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Icon/Icon.types.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              In a computer's graphical user interface ( GUI ), an icon is an image that represents an application, a capability, or some other concept or specific entity with meaning for the user. An icon is usually selectable but can also be a nonselectable image such as a company's logo.
            </p>
          </div>
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Adjust to proper size to highlight importance but not occupying too much space.</li>
              <li>Be simple and concise.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use Icons to show pictures.</li>
              <li>Use photos or long sentences as icons.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...IconStatus }
          />
        }
      />
    );
  }
}
