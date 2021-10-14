import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-selection-modal',
  templateUrl: './selection-modal.component.html',
  styleUrls: ['./selection-modal.component.scss'],
})
export class SelectionModalComponent implements OnInit {
  @ViewChild("content") content;
  @Input() modalTitle = '';
  @Output() saveRequest = new EventEmitter<boolean>();

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  open() {
    this.modalService
      .open(this.content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.saveRequest.emit(true);
        },
        (reason) => {
          this.saveRequest.emit(false);
        }
      );
  }
}
