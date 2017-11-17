import * as React from 'react';
import {
  autobind,
  BaseComponent,
  css,
  findIndex,
  getId,
  customizable
} from '../../Utilities';
import {
  ISwatchColorPicker,
  ISwatchColorPickerProps,
  ISwatchColorPickerStyleProps,
  ISwatchColorPickerStyles,
  IColorCellProps,
} from './SwatchColorPicker.types';
import { getColorFromString } from '../../utilities/color/colors';
import { Grid } from '../../utilities/grid/Grid';
import { GridCell } from '../../utilities/grid/GridCell';
import { IGridCellProps } from '../../utilities/grid/GridCell.types';
import { classNamesFunction, IClassNames } from '../../Styling';

export interface ISwatchColorPickerState {
  selectedIndex?: number;
}

class ColorPickerGridCell extends GridCell<IColorCellProps, IGridCellProps<IColorCellProps>> {
}

const getClassNames = classNamesFunction<ISwatchColorPickerStyleProps, ISwatchColorPickerStyles>();

@customizable('SwatchColorPicker', ['theme'])
export class SwatchColorPickerBase extends BaseComponent<ISwatchColorPickerProps, ISwatchColorPickerState> implements ISwatchColorPicker {

  public static defaultProps = {
    cellShape: 'circle',
    disabled: false,
    shouldFocusCircularNavigate: true
  } as ISwatchColorPickerProps;

  private _id: string;

  constructor(props: ISwatchColorPickerProps) {
    super(props);

    this._id = props.id || getId('swatchColorPicker');

    let selectedIndex: number | undefined;
    if (props.selectedId) {
      selectedIndex = this._getSelectedIndex(props.colorCells, props.selectedId);
    }

    this.state = {
      selectedIndex
    };
  }

  public componentWillReceiveProps(newProps: ISwatchColorPickerProps) {
    let newSelectedIndex;

    if (newProps.selectedId) {
      newSelectedIndex = this._getSelectedIndex(newProps.colorCells, newProps.selectedId);
    }

    if (newSelectedIndex !== this.state.selectedIndex) {
      this.setState({
        selectedIndex: newSelectedIndex
      });
    }
  }

  public render() {
    let {
      colorCells,
      columnCount,
      positionInSet,
      setSize,
      shouldFocusCircularNavigate,
      className,
      doNotContainWithinFocusZone,
      disabled,
      getStyles,
    } = this.props;

    const classNames = getClassNames(
      getStyles!,
      {
        theme: this.props.theme!,
        className,
        disabled,
        isSelected: false,
        circle: this.props.cellShape === 'circle'
      }
    );

    if (colorCells.length < 1 || columnCount < 1) {
      return null;
    }
    return (
      <Grid
        items={ colorCells.map((item, index) => { return { ...item, index }; }) }
        columnCount={ columnCount }
        onRenderItem={ this._renderOption }
        positionInSet={ positionInSet && positionInSet }
        setSize={ setSize && setSize }
        shouldFocusCircularNavigate={ shouldFocusCircularNavigate }
        doNotContainWithinFocusZone={ doNotContainWithinFocusZone }
        onBlur={ this._onSwatchColorPickerBlur }
        containerClassName={ classNames.container }
      />);
  }

  /**
   * When the whole swatchColorPicker is blurred,
   * make sure to clear the pending focused stated
   */
  @autobind
  private _onSwatchColorPickerBlur() {
    if (this.props.onCellFocused) {
      this.props.onCellFocused();
    }
  }

  /**
   * Get the selected item's index
   * @param items - The items to search
   * @param selectedId - The selected item's id to find
   * @returns {number} - The index of the selected item's id, -1 if there was no match
   */
  private _getSelectedIndex(items: IColorCellProps[], selectedId: string): number | undefined {
    let selectedIndex = findIndex(items, (item => (item.id === selectedId)));
    return selectedIndex >= 0 ? selectedIndex : undefined;
  }

  /**
   * Render a color cell
   * @param item - The item to render
   * @returns {JSX.Element} - Element representing the item
   */
  @autobind
  private _renderOption(item: IColorCellProps): JSX.Element {
    let id = this._id;
    const classNames = getClassNames(
      this.props.getStyles!,
      {
        theme: this.props.theme!,
        className: this.props.className,
        disabled: this.props.disabled,
        isSelected: this.state.selectedIndex !== undefined && (this.state.selectedIndex === item.index),
        circle: this.props.cellShape === 'circle',
      }
    );
    return (
      <ColorPickerGridCell
        item={ item }
        id={ id }
        key={ id + item.id }
        disabled={ this.props.disabled }
        className={ classNames.josh }
        onClick={ this._onCellClick }
        onHover={ this._onGridCellHovered }
        onFocus={ this._onGridCellFocused }
        onRenderItem={ this._onRenderColorOption }
        role={ 'gridcell' }
        selected={ this.state.selectedIndex !== undefined && (this.state.selectedIndex === item.index) }
        label={ item.label }
      />
    );
  }

  /**
   * Callback passed to the GridCell class that will trigger the onCellHovered callback of the SwatchColorPicker
   */
  @autobind
  private _onGridCellHovered(item?: IColorCellProps): void {
    if (this.props && this.props.onCellHovered) {
      if (item) {
        this.props.onCellHovered(item.id, item.color);
      } else {
        this.props.onCellHovered();
      }
    }
  }

  /**
   * Callback passed to the GridCell class that will trigger the onCellFocus callback of the SwatchColorPicker
   */
  @autobind
  private _onGridCellFocused(item?: IColorCellProps): void {
    if (this.props && this.props.onCellFocused) {
      if (item) {
        this.props.onCellFocused(item.id, item.color);
      } else {
        this.props.onCellFocused();
      }
    }
  }

  /**
   * Render the core of a color cell
   * @returns {JSX.Element} - Element representing the core of the item
   */
  @autobind
  private _onRenderColorOption(colorOption: IColorCellProps): JSX.Element {
    // Build an SVG for the cell with the given shape and color properties
    const classNames = getClassNames(
      this.props.getStyles!,
      {
        theme: this.props.theme!,
        className: this.props.className,
        disabled: this.props.disabled,
        isSelected: this.state.selectedIndex !== undefined && (this.state.selectedIndex === colorOption.index),
        circle: this.props.cellShape === 'circle',
      }
    );
    return (
      <svg className={ classNames.svg } viewBox='0 0 20 20' fill={ getColorFromString(colorOption.color as string)!.str } >
        {
          this.props.cellShape === 'circle' ?
            <circle cx='50%' cy='50%' r='50%' /> :
            <rect width='100%' height='100%' />
        }
      </svg>
    );
  }

  /**
   * Handle the click on a cell
   * @param item - The cell that the click was fired against
   */
  @autobind
  private _onCellClick(item: IColorCellProps) {
    if (this.props.disabled) {
      return;
    }

    let index = item.index as number;

    // If we have a valid index and it is not already
    // selected, select it
    if (index >= 0 && index !== this.state.selectedIndex) {
      if (this.props.onColorChanged) {
        this.props.onColorChanged(item.id, item.color);
      }

      this.setState({
        selectedIndex: index
      });
    }
  }
}