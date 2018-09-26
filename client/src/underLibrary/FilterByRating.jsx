import React from 'react';

function FilterByRating(props){

      // xxxx Close the dropdown menu if the user clicks outside of it
    //taken from an online source, overstack i think
    window.onclick = function(event) {
        if ( !event.target.matches('.dropbtn')) {
            let dropdowns = document.getElementsByClassName("dropdown-content");
            let i;
            for (i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
                }
            }
        }
    } 
    function showDropDown(){
        const starsDown = document.querySelector('.dropdown-content')
        starsDown.classList.toggle("show");
      }

    return(
           <div className="dropdown">
                <div onClick={()=>showDropDown()} className="dropbtn">Filter by rating</div>
                    <div className="dropdown-content">
                        <a onClick={()=>props.filterByStars(1)} >1 star</a>
                        <a onClick={()=>props.filterByStars(2)} >2 stars</a>
                        <a onClick={()=>props.filterByStars(3)} >3 stars</a>
                        <a onClick={()=>props.filterByStars(4)} >4 stars</a>
                        <a onClick={()=>props.filterByStars(5)} >5 stars</a>
                    </div>
            </div>
    )
}

export default FilterByRating;