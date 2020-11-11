const assert = require("chai").assert;

const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();

chai.use(chaiHttp);

const app = require("../app");
const server = require("../index");

describe("TEST APP FUNCTION FILE", () => {
  describe("sayHello()", () => {
    it("sayHello should return hello", () => {
      assert.equal(app.sayHello(), "hello");
    });
    it("sayHello should return type string", () => {
      let result = app.sayHello();
      assert.typeOf(result, "string");
    });
  });
  describe("addNumber()", () => {
    it("addNumber should be equal 5", () => {
      assert.equal(app.addNumber(5, 5), 10);
    });
    it("addNumber should be above 5", () => {
      assert.isAbove(app.addNumber(5, 5), 5);
    });
    it("addNumber should be type number", () => {
      assert.typeOf(app.addNumber(5, 5), "number");
    });
  });
});

describe("TEST SERVER FILE", () => {
  describe("TEST /test", () => {
    it("It should GET body start serve", (done) => {
      chai
        .request(server)
        .get("/test")
        .end((err, respone) => {
          respone.should.have.status(200);
          respone.body.should.to.deep.equal({ message: "Hello" });
          respone.body.should.have.property("message").eql("Hello");
        });
      done();
    });
  });
  describe("TEST /", () => {
    it("It should GET body start serve", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, respone) => {
          respone.should.have.status(200);
          respone.should.have.property("text"); // มันตอบ content เป็น text
          respone.should.have.property("text").eql("Hello");
        });
      done();
    });
  });
  describe("TEST /post", () => {
    it("It should GET body start serve", (done) => {
      const data = {
        name: "Piyachanin",
        age: 23,
        nickname: "yim",
      };
      chai
        .request(server)
        .post("/post")// ใช้ method อะไรก้ใช้อันนั้น
        .send(data)
        .end((err, respone) => {
          respone.should.have.status(200);
          respone.body.should.be.a("object");
          respone.body.should.have.property("data1").eq("Piyachanin");
          respone.body.should.have.property("data2").eq(23);
          respone.body.should.have.property("data3").eq("yim");
        });
      done();
    });
  });
});
