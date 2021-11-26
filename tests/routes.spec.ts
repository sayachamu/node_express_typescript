import { mockReq, mockRes } from 'sinon-express-mock'
import { Request, Response, NextFunction, request } from 'express';
import { savePoker } from '../app/routes/index'

// describe("Test example", () => {
//     // Hidden for simplicity
//     it("POST /send", (done) => {
//       request(app)
//         .post("/send")
//         .expect("Content-Type", /json/)
//         .send({
//           email: "francisco@example.com",
//         })
//         .expect(201)
//         .expect((res) => {
//           res.body.data.length = 2;
//           res.body.data[0].email = "test@example.com";
//           res.body.data[1].email = "francisco@example.com";
//         })
//         .end((err, res) => {
//           if (err) return done(err);
//           elementId = res.body.data[1].id;
//           return done();
//         });
//     });
//     // More things come here
//   });

describe('User Registration', () => {
    it('User has an invalid first name', async () => {
      const mockRequest = {
        body: {
          hands:  [
            "h1,h2,h3,h4,h5",
            "s1,h1,c1,d1,h5",
            "s1,h1,c1,d1,h5",
            "ss1,dd2,c1,c2,c3,c4"
            ]
        },
      };
  
      const mockResponse = {
        send: jest.fn().mockReturnThis(),
        status: jest.fn(),
      };
  
    const req = mockReq(mockRequest);
    const res = mockRes();
    const hoge = await savePoker(mockRequest, mockResponse);
    console.log('---req', req.body)
    console.log('---res', res.send, '---hoge', hoge)
    });
  });