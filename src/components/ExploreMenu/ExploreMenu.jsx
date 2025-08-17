import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {

  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our art</h1>
        <p className='explore-menu-text'>Browse through a diverse collection of stunning artwork. Our mission is to inspire and captivate, one masterpiece at a time, celebrating creativity in every stroke.</p>
        
        <div className="explore-menu-list-container">
            <div className="explore-menu-list">
                {menu_list.map((item,index)=>{
                    return (
                        // different different category wise items concept :
                        <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        {/* niche-ka-concept =jis image pe click krege uska saara category active mark hoga */}
                            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                            {/* <p>399 onwards</p> */}
                        </div>
                    )
                })}
            </div>
            <div className="scroll-indicator">
                <span>← Scroll →</span>
            </div>
        </div>
        
        <hr />
    </div>
  )
}

export default ExploreMenu