import React, { useEffect} from 'react';
import { useQuery} from '@apollo/react-hooks';
import { useStoreContext } from '../../utils/GlobalState';
import { QUERY_SELECTED_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import { UPDATE_PRODUCTS } from '../../utils/actions';

function ProductList() {
    const [state, dispatch] = useStoreContext();
    const { selectedProducts } = state;
    const { loading, data } = useQuery(QUERY_SELECTED_PRODUCTS);

    useEffect(() => {
        if (data) {
          dispatch({
            type: UPDATE_PRODUCTS,
            products: data.products
          });
          data.products.forEach((product) =>{
            idbPromise('products', 'put', product);
          });
        } else if (!loading) {
          idbPromise('products', 'get').then((products) => {
            dispatch({
              type: UPDATE_PRODUCTS,
              products: products
            });
          });
        }
      }, [data, loading, dispatch]);

    };

    export default ProductList;