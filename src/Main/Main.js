import React, {Component} from 'react';
import './Main.css'

class Main extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            amount: '',
            expenses: [],
            total: 0
        }
    }

// onChange method -> fires when the value of the input field changes. It uses the name attribute of the input to get the name of the state value that we're changing.

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

// fires when the 'add' button is clicked and passes in the click event. We first prevent the events default settings because it is within a form, and we do not want it to refresh the page. Then we copy the values of the amount and name from the input field and set them to a new variable within an object. We copy the current expenses from state and set those to a new variable that we can work with. Then we push the newExpense object onto the currentExpenses array, and then set the state  of expenses with that new updated array.

// In the meantime, we ensure that amount is an integer and set that to a new variable, and then set the current total from state to a new variable as well. We add the amount (num) to the total, and then set that new updated number to the total state.

//Finally, we set the state of amount and name back to empty strings to clear our input fields.

    addItem(e){
        e.preventDefault()
        let newExpense = {name: this.state.name, amount: this.state.amount}
        let currentExpenses = this.state.expenses
        let num = +this.state.amount
        let total = this.state.total
        total += num
        currentExpenses.push(newExpense)
        this.setState({expenses: currentExpenses, amount: '', name: '', total: total})
    }

// With the remove item method, we pass in the items amount and it's index. We then copy expenses from state so we have a variable to work with, splice the item (using it's index) out of that array, and then set that new array to state.

//In addition, we copy the current total from state to a variable, and then subtract the amount that was passed in our method from that total. We then set that new number to the total state.

    removeItem(amount, i){
        let currentExpenses = this.state.expenses
        currentExpenses.splice(i, 1)
        let num = +amount
        let total = this.state.total
        total -= num
        this.setState({expenses: currentExpenses, total: total})


    }

    render(){
        return (
            <main>
                <nav>
                    <div className="logo-line">
                        <img alt='logo' className="piggy" src={require('./download.svg')} />
                        <h3 className=" budget-builder">Budget Builder</h3>
                    </div>
                    <h4 className="total">Budget Total: $<span id='total'>{this.state.total}</span></h4>
                </nav>
                <section>
                    <div className="monthly-expenses-container">
                        <div className="monthly-expenses">
                            <h4 className="section_header">Monthly Expenses</h4>
                            <ul id='list'>
                            {
                                //Below, I'm mapping through my 'expenses' array (which is stored in state) and returning a <li> tag for each item. Remember, that the 'expenses' array is made up of objects, each containing a 'name' and an 'amount' property.
                                
                                // In the <li> tag, we're rendering the 'name' property for that item, as well as the 'amount property.

                                //Lastly, we're rendering an <img> tag to display our trashcan image. Within that, we add an onclick attribute that calls our 'remove item' method, passing in the current items amount, and it's index number.
                            }
                                {this.state.expenses.map((e, i) => {
                                    return (
                                        <li key={i}>
                                            {e.name} - ${e.amount}
                                            <img alt='trash' src={require('./trashcan.svg')} onClick={() => this.removeItem(e.amount, i)}/>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <form className="add-bill-container">
                        <h4 className="section_header">Add Bill</h4>
                        <div className='bill_input'>
                            <h5>Name</h5>
                            <input name='name' value={this.state.name} onChange={(e) => {this.onChange(e)}}/>
                        </div>
                        <div className='bill_input'>
                            <h5>Amount</h5>
                            <input name='amount' type='number' value={this.state.amount} onChange={(e) => this.onChange(e)}/>
                        </div>
                        <button onClick={(e) => {this.addItem(e)}}>Add</button>
                    </form>
                </section>
            </main>
        )
    }
}

export default Main