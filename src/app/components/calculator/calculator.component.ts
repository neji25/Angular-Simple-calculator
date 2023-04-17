import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  numberInput = ''
  isDark = true
  isActive = true

  onClear() {
    this.numberInput = ''
  }

  addNumberOrOperator(num: string) {
    const operators = ['*', '/', '+', '-']
    if(operators.includes(num)) {
      if(this.numberInput === '' ||
        this.numberInput[this.numberInput.length-1].includes(num))
        return
    }
    this.numberInput += num
  }

  onBack() {
    this.numberInput = this.numberInput.substring(0, this.numberInput.length - 1)
  }

  onEqual() {
    if(this.numberInput == '') {
      this.numberInput = 'Empty!'
      setTimeout(() => this.numberInput = '', 500)
      return
    }
    this.numberInput = this.parser(this.numberInput)
  }

  parser(str: string): string {
    return new Function(`return ${str}`)().toString()
  }

  toggleTheme() {
    this.isDark = !this.isDark
    this.isActive = !this.isActive
  }
}
