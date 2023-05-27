import './navbar.scss'

function Navbar() {


  var pic=JSON.parse(localStorage.getItem("user")) || null;

   
return(
  <div className="navBar">
    <div className="wrapper">

    <h3>Admin Panel</h3>
    {
      pic?<img src={pic.otherDetails.img} alt="." />:<img src="https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA=" alt="." />  
    }
    
    </div> 
  </div>
) 

}

export default Navbar