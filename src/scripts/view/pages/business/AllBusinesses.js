import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, Row, Col } from "antd";
import {
  get_businesses,
  add_business,
  setBusinessesLoadStatus,
} from "../../../core/actions/business";
import AddBusinessModal from "./AddBusinessForm";

const AllBusinessesPage = ({ dispatch, auth, business, match, history }) => {
  const [open, setOpen] = useState(false);
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
      <AddBusinessModal
        open={open}
        setOpen={setOpen}
        onSubmit={handleAddBusiness}
      />
      <Button type="primary" onClick={() => setOpen(true)}>
        اضافه کردن کسب و کار
      </Button>
      <Row style={{ marginTop: "2em" }} gutter={24}>
        {business.getBusinessesStatus === "loaded" &&
          business.businesses.map((business, index) => (
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
