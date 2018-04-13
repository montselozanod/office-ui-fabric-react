import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ListBasicExample } from './examples/List.Basic.Example';
import { ListGridExample } from './examples/List.Grid.Example';
import { ListScrollingExample } from './examples/List.Scrolling.Example';
import { ListGhostingExample } from './examples/List.Ghosting.Example';
import { createListItems } from '@uifabric/example-app-base';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ListStatus } from './List.checklist';

const ListBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/List/examples/List.Basic.Example.tsx') as string;
const ListGridExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/List/examples/List.Grid.Example.tsx') as string;
const ListScrollingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/List/examples/List.Scrolling.Example.tsx') as string;
const ListGhostingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/List/examples/List.Ghosting.Example.tsx') as string;

let _cachedItems: any;

export class ListPage extends React.Component<IComponentDemoPageProps, {}> {
  constructor(props: IComponentDemoPageProps) {
    super(props);

    _cachedItems = _cachedItems || createListItems(5000);
  }

  public render() {
    return (
      <ComponentPage
        title='List'
        componentName='ListExample'
        exampleCards={
          <div>
            <ExampleCard title='List of 5000 grid items' isOptIn={ true } code={ ListGridExampleCode }>
              <ListGridExample items={ _cachedItems } />
            </ExampleCard>
            <ExampleCard title='List of 5000 variable height items' isOptIn={ true } code={ ListBasicExampleCode }>
              <ListBasicExample items={ _cachedItems } />
            </ExampleCard>
            <ExampleCard title='Scrolling items into view' isOptIn={ true } code={ ListScrollingExampleCode }>
              <ListScrollingExample items={ _cachedItems } />
            </ExampleCard>
            <ExampleCard title='Rendering ghost items while the list is scrolling' isOptIn={ true } code={ ListGhostingExampleCode }>
              <ListGhostingExample items={ _cachedItems } />
            </ExampleCard>
          </div>
        }
        allowNativeProps={ true }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/List/List.types.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              <span>List provides a base component for rendering large sets of items. It is agnostic of layout, the tile component used, and selection management. These concerns can be layered separately.</span>
            </p>
            <p>
              <b>Performance is important, and DOM content is expensive. Therefore limit what you render.</b> Unlike a simple for loop that renders all items in a set, a List uses ui virtualization. It only renders a subset of items, and as you scroll around, the subset of rendered content is shifted to what you're looking at. This gives a much better experience for large sets, especially when the per-item components are complex/render intensive/network intensive.
            </p>
            <p>
              Lists break down the set of items passed in into pages. Only pages within a "materialized window" are actually rendered. As that window changes due to scroll events, pages that fall outside that window are removed, and their layout space is remembered and pushed into spacer elements. This gives the user the experience of browsing massive amounts of content but only using a small number of actual elements. This gives the browser much less layout to resolve, and gives React DOM diffing much less content to worry about.
            </p>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...ListStatus }
          />
        }
      />
    );
  }
}
