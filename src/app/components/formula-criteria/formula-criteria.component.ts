import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CriteriaModel} from '../../model/criteria.model';
import {callNgModuleLifecycle} from "@angular/core/src/view/ng_module";
import {FormulaCriteriaModel} from "../../model/formulaCriteria.model";

@Component({
  selector: 'app-formula-criteria',
  templateUrl: './formula-criteria.component.html',
  styleUrls: ['./formula-criteria.component.css']
})
export class FormulaCriteriaComponent implements OnInit {

  @Input() criteria: CriteriaModel;
  @Input() formulaModel: FormulaCriteriaModel;
  argument: string[] = [];
  @Output() updateArgumenrt = new EventEmitter<{}>();
  operation: string;
  maximum: number;
  minimum: number;

  constructor() {
  }

  addArguments() {
    this.argument.push('');
    this.updateArgumenrt.emit({argument: this.argument, minimun: this.minimum,
      maximun: this.maximum, operation: this.operation});
  }

  getFormulaDetails() {
    console.log('inside formula details')
    this.updateArgumenrt.emit({
      argument: this.argument, minimun: this.minimum,
      maximun: this.maximum, operation: this.operation
    });
  }



  ngOnInit() {
    console.log(this.minimum);
    console.log('inside formula init');
    this.updateArgumenrt.emit({argument: this.argument, minimun: this.minimum,
      maximun: this.maximum, operation: this.operation});
  }

  trackByIndex(index: number): any {
    return index;
  }

}
