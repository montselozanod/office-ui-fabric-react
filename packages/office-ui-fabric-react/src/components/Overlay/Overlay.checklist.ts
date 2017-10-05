import { IChecklistStatus, ChecklistStatus } from '../../demo/ComponentStatus/ComponentStatus.Props';

export const OverlayStatus: IChecklistStatus = {
  keyboardAccessibilitySupport: ChecklistStatus.unknown,
  markupSupport: ChecklistStatus.unknown,
  highContrastSupport: ChecklistStatus.fail,
  rtlSupport: ChecklistStatus.pass,
  testCoverage: ChecklistStatus.none
};