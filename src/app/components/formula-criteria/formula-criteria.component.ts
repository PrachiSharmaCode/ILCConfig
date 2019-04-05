import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CriteriaModel} from '../../model/criteria.model';

@Component({
  selector: 'app-formula-criteria',
  templateUrl: './formula-criteria.component.html',
  styleUrls: ['./formula-criteria.component.css']
})
export class FormulaCriteriaComponent implements OnInit {

  @Input() criteria: CriteriaModel;
  argument: string[] = [];
  @Output() updateArgumenrt = new EventEmitter<string[]>();
  operation: string;
  maximum: number;
  minimum: number;
  constructor() { }

  addArguments() {
    this.argument.push('');
    this.updateArgumenrt.emit(this.argument);
  }

  onRefereashButton() {
    this.criteria.updateFormulaOpration(this.argument, this.operation, this.minimum, this.maximum);
  }

  ngOnInit() {
  }

  trackByIndex(index: number): any {
    return index;
  }

}
