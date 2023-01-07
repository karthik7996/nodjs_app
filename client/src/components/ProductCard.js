import React from 'react'
import { useNavigate } from 'react-router-dom';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const ProductCard = ({p}) => {
  const navigate = useNavigate();
        return (
          <div style={{position:'relative'}} className='productCard border border-white border-top-0'>
          <img src= {p.images[0].url} className="card-img" alt={p.productName} />
            <div style={{padding: "0 10px"}}>
              <h3 className='mt-3'>{p.productName}</h3>
              <p className='mt-3'>{p.subCategory}</p>
            </div>
            <div style={{margin: "10px", position:'absolute', bottom:'5px'}}>
                <button className="scale" onClick={()=>navigate(`/singleproduct/${p._id}`)}>Bid higher</button> 
                <OverlayTrigger 
        delay={{ hide: 450, show: 300 }}
        overlay={(props) => (
          <Tooltip {...props} > 
            {p.productDescription}
          </Tooltip>
        )}
        placement="bottom"
      ><img src="images/i_icon.svg" className="info scale" style={{position:'absolute', right:'-142px'}}/>
      </OverlayTrigger>
                
            </div>
          </div>
  )


}

export default ProductCard