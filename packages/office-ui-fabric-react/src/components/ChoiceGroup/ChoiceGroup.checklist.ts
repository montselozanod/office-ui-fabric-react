import { IChecklistStatus, ChecklistStatus } from '../../demo/ComponentStatus/ComponentStatus.Props';

export const ChoiceGroupStatus: IChecklistStatus = {
  keyboardAccessibilitySupport: ChecklistStatus.unknown,
  markupSupport: ChecklistStatus.unknown,
  highContrastSupport: ChecklistStatus.pass,
  rtlSupport: ChecklistStatus.pass,
  testCoverage: ChecklistStatus.fair
};