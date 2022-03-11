import React from 'react';

function User(props) {
    return (
        <div>
            <div className="ScriptTop">
    <div className="rt-container">
        <div className="col-rt-4" id="float-right">
 
            {/* <!-- Ad Here --> */}
            
        </div>
        <div className="col-rt-2">
            <ul>
                <li><a href="https://codeconvey.com/html-code-for-student-profile" title="Back to tutorial page">Back to Tutorial</a></li>
            </ul>
        </div>
    </div>
</div>

<header className="ScriptHeader">
    <div className="rt-container">
    	<div className="col-rt-12">
        	<div className="rt-heading">
            	<h1>Profile</h1>
                
            </div>
        </div>
    </div>
</header>

<section>
    <div className="rt-container">
          <div className="col-rt-12">
              <div className="Scriptcontent">
              
{/* <!-- Student Profile --> */}
<div className="student-profile py-4">
  <div className="container">
    <div className="row">
      <div className="col-lg-4">
        <div className="card shadow-sm">
          <div className="card-header bg-transparent text-center">
            <img className="profile_img" src="https://source.unsplash.com/600x300/?student" alt="student dp"/>
            <h3>Ishmam Ahasan Samin</h3>
          </div>
          <div className="card-body">
            <p className="mb-0"><strong className="pr-1">Student ID:</strong>321000001</p>
            <p className="mb-0"><strong className="pr-1">className:</strong>4</p>
            <p className="mb-0"><strong className="pr-1">Section:</strong>A</p>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="card shadow-sm">
          <div className="card-header bg-transparent border-0">
            <h3 className="mb-0"><i className="far fa-clone pr-1"></i>Scheduled Calender</h3>
          </div>
          <div className="card-body pt-0">
            
          </div>
        </div>
      
    </div>
  </div>
</div>
{/* <!-- partial --> */}
           
    		</div>
		</div>
    </div>
    </div>
</section>
        </div>
    );
}

export default User;