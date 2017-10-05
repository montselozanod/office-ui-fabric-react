import { IChecklistStatus, ChecklistStatus } from '../../demo/ComponentStatus/ComponentStatus.Props';

export const ContextualMenuStatus: IChecklistStatus = {
  keyboardAccessibilitySupport: ChecklistStatus.unknown,
  markupSupport: ChecklistStatus.unknown,
  highContrastSupport: ChecklistStatus.fail,
  rtlSupport: ChecklistStatus.fail,
  testCoverage: ChecklistStatus.good
};