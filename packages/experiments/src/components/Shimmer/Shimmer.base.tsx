import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
} from '../../Utilities';
import {
  IShimmerProps,
  IShimmerStyleProps,
  IShimmerStyles,
  ShimmerElementType,
  ICircle,
  ILine,
  IGap,
  ShimmerElementVerticalAlign,
} from './Shimmer.types';
import {
  DefaultPalette,
  IStyleSet
} from '../../Styling';
import { ShimmerLine } from './ShimmerLine/ShimmerLine';
import { ShimmerGap } from './ShimmerGap/ShimmerGap';
import { ShimmerCircle } from './ShimmerCircle/ShimmerCircle';

const LINE_DEFAULT_HEIGHT = 16;
const GAP_DEFAULT_HEIGHT = 16;
const CIRCLE_DEFAULT_HEIGHT = 24;

const getClassNames = classNamesFunction<IShimmerStyleProps, IShimmerStyles>();

export class ShimmerBase extends BaseComponent<IShimmerProps, {}> {
  public static defaultProps: IShimmerProps = {
    isDataLoaded: false,
    isBaseStyle: false
  };
  private _classNames: { [key in keyof IShimmerStyles]: string };
  constructor(props: IShimmerProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { getStyles, width, lineElements, children, isDataLoaded, isBaseStyle } = this.props;

    const rowHeight: number | undefined = lineElements ? findMaxElementHeight(lineElements) : undefined;

    this._classNames = getClassNames(getStyles!, { width, rowHeight, isDataLoaded, isBaseStyle });

    const renderedElements: React.ReactNode = getRenderedElements(lineElements, rowHeight);

    return (
      <div className={ this._classNames.root }>
        <div className={ this._classNames.shimmerWrapper }>
          { !!isBaseStyle ? children : renderedElements }
        </div>

        { !!isDataLoaded &&
          <div className={ this._classNames.dataWrapper }>
            { !!children ? children : null }
          </div>
        }
      </div>
    );
  }
}

export function getRenderedElements(lineElements?: Array<ICircle | IGap | ILine>, rowHeight?: number): React.ReactNode {
  const renderedElements: React.ReactNode = lineElements ?
    lineElements.map((elem: ICircle | ILine | IGap, index: number): JSX.Element => {
      switch (elem.type) {
        case ShimmerElementType.CIRCLE:
          return (
            <ShimmerCircle
              key={ index }
              { ...elem }
              borderStyle={ getBorderStyles(elem, rowHeight) }
            />
          );
        case ShimmerElementType.GAP:
          return (
            <ShimmerGap
              key={ index }
              { ...elem }
              borderStyle={ getBorderStyles(elem, rowHeight) }
            />
          );
        case ShimmerElementType.LINE:
          return (
            <ShimmerLine
              key={ index }
              { ...elem }
              borderStyle={ getBorderStyles(elem, rowHeight) }
            />
          );
      }
    }) : (
      <ShimmerLine
        height={ LINE_DEFAULT_HEIGHT }
      />
    );

  return renderedElements;
}

export function getBorderStyles(elem: ICircle | IGap | ILine, rowHeight?: number): IStyleSet | undefined {
  const elemHeight: number | undefined = elem.height;

  const dif: number = rowHeight && elemHeight ? rowHeight - elemHeight : 0;

  let borderStyle: IStyleSet | undefined;

  if (!elem.verticalAlign || elem.verticalAlign === ShimmerElementVerticalAlign.CENTER) {
    borderStyle = {
      borderBottom: `${dif ? Math.floor(dif / 2) : 0}px solid ${DefaultPalette.white}`,
      borderTop: `${dif ? Math.ceil(dif / 2) : 0}px solid ${DefaultPalette.white}`
    };
  } else if (elem.verticalAlign && elem.verticalAlign === ShimmerElementVerticalAlign.TOP) {
    borderStyle = {
      borderBottom: `${dif ? dif : 0}px solid ${DefaultPalette.white}`,
      borderTop: `0px solid ${DefaultPalette.white}`
    };
  } else if (elem.verticalAlign && elem.verticalAlign === ShimmerElementVerticalAlign.BOTTOM) {
    borderStyle = {
      borderBottom: `0px solid ${DefaultPalette.white}`,
      borderTop: `${dif ? dif : 0}px solid ${DefaultPalette.white}`
    };
  }

  return borderStyle;
}

export function findMaxElementHeight(elements: Array<ICircle | IGap | ILine>): number {
  const itemsDefaulted: Array<ICircle | IGap | ILine> = elements.map((elem: ICircle | IGap | ILine): ICircle | IGap | ILine => {
    switch (elem.type) {
      case ShimmerElementType.CIRCLE:
        if (!elem.height) {
          elem.height = CIRCLE_DEFAULT_HEIGHT;
        }
      case ShimmerElementType.LINE:
        if (!elem.height) {
          elem.height = LINE_DEFAULT_HEIGHT;
        }
      case ShimmerElementType.GAP:
        if (!elem.height) {
          elem.height = GAP_DEFAULT_HEIGHT;
        }
    }
    return elem;
  });

  const rowHeight = itemsDefaulted.reduce((acc: number, next: ICircle | IGap | ILine): number => {
    return next.height ?
      next.height > acc ? next.height : acc
      : acc;
  }, 0);

  return rowHeight;
}