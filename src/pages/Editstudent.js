
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class Editstudent extends Component
 {

      state = {
          name:'',
          course:'',
          email:'',
          phone:'',
      }

      handleInput = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            });
      }
       async componentDidMount() {

           const stud_id = this.props.match.params.id;
           //console.log(stud_id);

           const res = await axios.get(`http://127.0.0.1:8000/api/edit-student/${stud_id}`);
           if(res.data.status === 200)
           {
             this.setState({
                name:res.data.student.name,
                course:res.data.student.course,
                email:res.data.student.email,
                phone:res.data.student.phone,

             });
           }
           else if(res.data.status === 404)
           {
            swal({
                title: "Warning!",
                text: res.data.message,
                icon: "warning",
                button: "Ok",
              });
              this.props.history.push('/');
           }
       
        }
      updateStudent = async (e) => {
          e.preventDefault();

          document.getElementById('updatebtn').innerText = "Updating";
          const stud_id = this.props.match.params.id;
          const res = await axios.put(`http://127.0.0.1:8000/api/update-student/${stud_id}`, this.state);

          if(res.data.status === 200)
          {

                  //console.log(res.data.message);
                  swal({
                    title: "Success!",
                    text: res.data.message,
                    icon: "success",
                    button: "Ok",
                  });
                 
                   document.getElementById('updatebtn').innerText = false;
                   document.getElementById('updatebtn').innerText = "Update Student";
                 
          }
          else
          {
            if(res.data.status === 404)
           {
            swal({
                title: "Warning!",
                text: res.data.message,
                icon: "warning",
                button: "Ok",
              });
              this.props.history.push('/');
           }
          }
               
         }

    render() {
        return (
            <div className="container">
               <div className="row">
               <div className="col-md-6">
                 <div className="card">
                 <div className="card-header">
                   <h4>Edit Students
                     <Link to ={'/'} className="btn btn-primary btn-sm float-end"> Back </Link>
                   </h4>
                 </div>
                 <div className="card-body">

                 <form onSubmit={this.updateStudent}>
                   <div className="form-group mb-3">
                      <label>Student Name</label>
                      <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control" />
                   </div>
                   <div className="form-group mb-3">
                      <label>Student Course</label>
                      <input type="text" name="course" onChange={this.handleInput} value={this.state.course} className="form-control" />
                   </div>
                   <div className="form-group mb-3">
                      <label>Student Email</label>
                      <input type="text" name="email" onChange={this.handleInput} value={this.state.email} className="form-control" />
                   </div>
                   <div className="form-group mb-3">
                      <label>Student Phone</label>
                      <input type="text" name="phone" onChange={this.handleInput} value={this.state.phone} className="form-control" />
                   </div>
                   <div className="form-group mb-3">
                      <button type="submit" id="updatebtn" className="btn btn-primary" >Update Student</button>
                   </div>
                     

                 </form> 
                 </div>
                 </div>
               </div>
               </div>
                
            </div>
        )
    }
}

export default Editstudent;