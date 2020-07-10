import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Row, Col, Input } from "antd";
import {
  get_businesses,
  add_business,
  setBusinessesLoadStatus,
} from "../../../core/actions/business";
import AddBusinessModal from "./AddBusinessForm";

const AllBusinessesPage = ({ dispatch, auth, business, match, history }) => {
  const [open, setOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    dispatch(get_businesses(auth.token));

    return () => {
      dispatch(setBusinessesLoadStatus("idle"));
    };
  }, []);

  const handleAddBusiness = (
    name,
    description,
    address,
    phoneNumber,
    category
  ) => {
    dispatch(
      add_business(
        { name, description, address, phoneNumber, category },
        auth.user.id
      )
    );
  };
  return (
    <div style={{ padding: "2em 1em" }}>
      <Row container justify="space-between">
        <Col>
          <h2>کسب و کار‌ها</h2>
        </Col>
        <Col>
          <Input
            placeholder="جستجو"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
            allowClear
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "2em" }} gutter={24}>
        {business.getBusinessesStatus === "loaded" &&
          business.businesses
            .filter((i) => i.name.includes(searchKeyword))
            .map((business, index) => (
              <Col span={8} key={index} style={{ marginBottom: "1em" }}>
                <Card>
                  <Card.Meta
                    title={business.name}
                    description={business.description}
                  />
                  <Link to={`/business_detail/${business.id}`}>
                    <Button style={{ marginTop: "2em" }} type="primary">
                      {" "}
                      مشاهده کسب و کار
                    </Button>
                  </Link>
                </Card>
              </Col>
            ))}
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  business: state.business,
  auth: state.auth,
});

export default connect(mapStateToProps)(AllBusinessesPage);
