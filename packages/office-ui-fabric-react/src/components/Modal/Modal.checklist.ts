import { IChecklistStatus, ChecklistStatus } from '../../demo/ComponentStatus/ComponentStatus.Props';

export const ModalStatus: IChecklistStatus = {
  keyboardAccessibilitySupport: ChecklistStatus.unknown,
  markupSupport: ChecklistStatus.unknown,
  highContrastSupport: ChecklistStatus.pass,
  rtlSupport: ChecklistStatus.fail,
  testCoverage: ChecklistStatus.none
};