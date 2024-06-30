import { Col } from "react-bootstrap";

import "./button.css";


import { Link } from "react-router-dom";
export const ProjectCard = ({ title, description, imgUrl }) => {
 
   return(
    <Col size={12} sm={6} md={4}>
        <div className="proj-imgbx">
          <img
            src="https://www.bing.com/images/search?view=detailV2&ccid=HVf23AkG&id=A331A77DDFC95BFAFFB5910FA2D5FE6BD132E568&thid=OIP.HVf23AkGENXGrAi2PbVoXwHaE8&mediaurl=https%3a%2f%2felements-cover-images-0.imgix.net%2f4734edec-5e55-4954-bc6f-7a2a7b36c64f%3fauto%3dcompress%252Cformat%26fit%3dmax%26w%3d900%26s%3dc09fd54f825e6157e368d76fe923e75a&exph=600&expw=900&q=workshop+image&simid=607989038609338092&FORM=IRPRST&ck=F52CC44BCED54C5980FF717AD2668BBD&selectedIndex=9&itb=0"
            width="500"
            height="600" />
          <div className="proj-txtx">
            <h4>{title}</h4>
            <span>{description}</span>
          </div>
        </div>


      </Col>
  )
}
