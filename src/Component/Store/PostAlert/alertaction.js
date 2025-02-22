import axios from "axios";
import { Action } from "history";
import { DELETEALERT, POSTALERTERROR, POSTALERTLOADING, POSTALERTSUCCESS } from "./alerttype";


export const postalertapi = (dispatch,category, productid) => {
    
    dispatch({type:POSTALERTLOADING})

    axios
      .get(`https://modesensbackend.herokuapp.com/${category}`)
      .then((res) => {
        res.data.map((el) => {
          if (el.web_scraper_order === productid) {
            axios
              .post("https://modesensbackend.herokuapp.com/alert", {
                web_scraper_order: el.web_scraper_order,
                category_MenClothing: el.category_MenClothing,
                brand_store: el.brand_store,
                category_MenClothing_href: el.category_MenClothing_href,
                product_name: el.product_name,
                product_description: el.product_description,
                product_price: el.product_price,
                product_img_src: el.product_img_src,
              })
              .then((res) =>
                axios
                  .get(`https://modesensbackend.herokuapp.com/alert`)
                  .then((res) =>
                    dispatch({ type: POSTALERTSUCCESS, payload: res.data })
                  )
              );
          }
        });
      })
      .catch(() => dispatch({ type: POSTALERTERROR }));
};



export const removealertapi = (dispatch,id) => {
    console.log(id)
    axios
      .delete(`https://modesensbackend.herokuapp.com/alert/${id}`)
      .then(() =>
        axios
          .get(`https://modesensbackend.herokuapp.com/alert`)
          .then((res) => dispatch({ type: DELETEALERT, payload: res.data }))
      );
};