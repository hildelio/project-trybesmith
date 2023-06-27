import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productService from '../../../src/database/service/productService';
import { Product } from '../../../src/types/Product';
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Testar se a requisição é válida', async function () {
    const body: Product = {
      name: 'test',
      price: 'test',
      orderId: 1,
    }
    const ProductMockModel = ProductModel.build({
      id: 8,
      name: 'test',
      price: 'test',
      orderId: 1
    });

    sinon.stub(ProductModel, 'create').resolves(ProductMockModel);

    // const result = await productService.create(body);

    const result = await chai.request(app).post('/products').send(body);;

    expect(result.status).to.equal(201);
    // expect(result.message).to.equal('Created');
    // expect(result.data).to.be.deep.equal({id: 8, name: 'test', price: 'test', orderId: 1});
  })

});
