import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/Api'
import NoteForm from '../components/NoteForm'

export class FoodCard extends Component {
    constructor(props) {
        super();
        this.state= {
            deleted: false,
            noteStatus: false,
            note: props.food.note,
            fields: null
        }
    }
    
    deleteFood = () => {
        api.deleteUserFood(this.props.id)
        .then(json => {
            console.log(json)
            this.setState({
                deleted: true,
                fields: {}
            })
        })
    }


    editFood = () => {
        this.props.prop.history.push({
            pathname: "/editfood",
            state: {
                id: this.props.id,
                date: this.props.food.date
            },
            
        })
    }

    handleChange = (e) => {
        let newFields = {...this.state.fields, [e.target.name]: e.target.value}
        this.setState({
            fields: newFields
        })
        console.log(this.state)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.props.id)
        if(this.state.fields === null){
            alert("Hey type something!")
        } else {
            api.editFoodNote(this.state.fields, this.props.id)
                .then(json => {
                    console.log(json)
                    this.setState({
                        noteStatus: true,
                        note: this.state.fields.note
                    })
                })
        }
    }

    noteButton = () => {
        this.setState({
            note: "",
            fields: null
        })
    }

    capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    render() {
        let deleted = this.state.deleted
        let note
            if(this.state.note === ""){
                note = <NoteForm id ={this.props.food.id} handleChange ={this.handleChange} handleSubmit = {(event) => this.handleSubmit(event)}/>
            } else {
                note = <div className ="food-note">
                    <p>Note:</p>
                    <p>{this.state.note}</p>
                    <button onClick={this.noteButton}>Edit Note</button>
                </div>
            }
        return (
            deleted === false ? (
            <div>
                <div className="input-card">
                    <div className ="input-pic">
                        <img height = '250px' width = '250px' src = {this.props.food.image}></img>
                    </div>
                    <div height = '700px' width = '700px' className="input-text">
                        <p>Food Name: {this.capitalize(this.props.food.name)}</p>
                        <p>Calories Consumed: {this.props.food.calories} calories</p>
                        <p>Fat: {this.props.food.fat} g</p>
                        <p>Protein: {this.props.food.protein} g</p>
                        <p>Carbohydrates: {this.props.food.carbs} g</p>
                        <div>
                            {note}
                        </div>
                        <br></br>
                        <button className="secondary-bttn" onClick = {this.editFood}>Edit</button>
                        <button className="secondary-bttn" onClick ={this.deleteFood}>Delete</button>
                        <br></br>
                    </div>
                </div>
                <br></br>
            </div>
            ) : (
                <h2>Deleted!</h2>
            )
        )
    }
}

export default FoodCard
