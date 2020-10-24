import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'rdc-settings',
  template: `
    <section class="relative">
      <button class="p-2 bg-white hover:bg-gray-100 border border-gray-100 rounded-full shadow-xs"
              (click)="toggleSettings()">
        <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37
                2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94
                1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0
                00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924
                0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      </button>
      <section *ngIf="settingsShown"
               class="origin-top-right absolute right-0 mt-3 text-sm">
        <section class="flex flex-col w-40 bg-white divide-y divide-gray-200 rounded shadow-md select-none">
          <label class="inline-flex items-center p-2 space-x-1">
            <input type="checkbox" [ngModel]="devRcVersions" (ngModelChange)="devRcVersionsChange.emit($event)">
            <span>dev and rc versions</span>
          </label>
          <label class="inline-flex items-center p-2 space-x-1">
            <input type="checkbox" [ngModel]="stgPrdVersions" (ngModelChange)="stgPrdVersionsChange.emit($event)">
            <span>stg and prd versions</span>
          </label>
        </section>
      </section>
    </section>
  `
})
export class SettingsComponent {

  @Input()
  devRcVersions: boolean;
  @Input()
  stgPrdVersions: boolean;

  @Output()
  devRcVersionsChange = new EventEmitter<boolean>();
  @Output()
  stgPrdVersionsChange = new EventEmitter<boolean>();

  settingsShown: boolean = false;

  toggleSettings() {
    this.settingsShown = !this.settingsShown;
  }
}
