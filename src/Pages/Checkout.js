import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  PageContainer,
  TopBar,
  BackButton,
  Container,
  LogoSection,
  LogoText,
  SubText,
  CheckoutLabel,
  CheckoutTag,
  FlexLayout,
  LeftSection,
  SectionTitle,
  SectionIcon,
  Form,
  Row,
  Input,
  PaymentButtons,
  PayPalButton,
  CODButton,
  RightSection,
  SummaryTitle,
  SummaryRow,
  SummaryTotal,
  BottomButtons,
  CancelButton,
  OrderNowButton
} from '../Design/Checkout';

const PAYPAL_CLIENT_ID = "ASKmv9SI7KJMNK3yafnnS5xEG-BgdxBaTHuUmU9UXtSJ5VjoyaICL9Nqre4vewdy-q5uf5Lin_lC27Yl";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('paypal');
  const [paypalReady, setPaypalReady] = useState(false);
  const [paypalPaid, setPaypalPaid] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const paypalRef = useRef();

  // Calculate totals
  const itemTotal = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.cartQty), 0);
  const shipping = cart.length > 0 ? 50 : 0; // Example shipping fee
  const total = itemTotal + shipping;

  // Load PayPal script when needed
  useEffect(() => {
    if (payment === "paypal" && !window.paypal) {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=PHP`;
      script.onload = () => setPaypalReady(true);
      document.body.appendChild(script);
    } else if (payment === "paypal") {
      setPaypalReady(true);
    }
  }, [payment]);

  // Render PayPal button when ready
  useEffect(() => {
    if (paypalReady && payment === "paypal" && paypalRef.current && window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: total ? total.toFixed(2) : "0.00" } }],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(() => {
            setPaypalPaid(true);
          });
        },
        onError: () => {
          alert("PayPal payment failed. Please try again.");
        }
      }).render(paypalRef.current);
    }
    // eslint-disable-next-line
  }, [paypalReady, payment, total]);

  // Reset PayPal paid state if payment method changes
  useEffect(() => {
    if (payment !== "paypal") setPaypalPaid(false);
  }, [payment]);

  // Handle order now
  const handleOrderNow = async () => {
    if (payment === "paypal" && !paypalPaid) {
      alert("Please complete PayPal payment first.");
      return;
    }
    setLoadingOrder(true);
    try {
      const res = await fetch('https://vynceianoani.helioho.st/ecos/order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          address,
          payment,
          total,
          cart
        })
      });
      const result = await res.json();
      setLoadingOrder(false);
      if (result.success) {
        alert('Order placed! Thank you.');
        navigate('/home');
      } else {
        alert(result.error || 'Order failed.');
      }
    } catch (err) {
      setLoadingOrder(false);
      alert('Server error.');
    }
  };

  return (
    <PageContainer>
      <TopBar>
        <BackButton onClick={() => navigate(-1)}>Back</BackButton>
      </TopBar>
      <Container>
        <LogoSection>
          <div>
            <LogoText>
              EC ONLINE<br />SHOP
            </LogoText>
            <SubText>MURA DITO!</SubText>
          </div>
        </LogoSection>
        <CheckoutLabel>
          <CheckoutTag>Checkout</CheckoutTag>
        </CheckoutLabel>
        <FlexLayout>
          <LeftSection>
            <SectionTitle>
              <SectionIcon>1</SectionIcon>
              Delivery Details
            </SectionTitle>
            <Form onSubmit={e => { e.preventDefault(); handleOrderNow(); }}>
              <Row>
                <Input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                />
              </Row>
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ marginBottom: '0.75rem' }}
                required
              />
              <Input
                type="text"
                placeholder="Delivery Address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
              />
              <SectionTitle style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>
                <SectionIcon>2</SectionIcon>
                Payment
              </SectionTitle>
              <PaymentButtons>
                <PayPalButton
                  type="button"
                  style={{ border: payment === 'paypal' ? '2px solid #111' : 'none' }}
                  onClick={() => setPayment('paypal')}
                >
                  <img src="https://storage.googleapis.com/a1aa/image/bb8882d5-d07e-4dd3-0a35-e4edb2c6bd8f.jpg" alt="PayPal" width="24" height="16" style={{ marginRight: '0.5rem' }} />
                  PayPal
                </PayPalButton>
                <CODButton
                  type="button"
                  style={{ border: payment === 'cod' ? '2px solid #111' : 'none' }}
                  onClick={() => setPayment('cod')}
                >
                  COD
                </CODButton>
              </PaymentButtons>
              {payment === "paypal" && (
                <div style={{ margin: "12px 0" }}>
                  <div ref={paypalRef}></div>
                  {paypalPaid ? (
                    <div style={{ color: "green", marginTop: 8 }}>Payment completed!</div>
                  ) : (
                    <div style={{ color: "#555", marginTop: 8 }}>Complete PayPal payment to place order.</div>
                  )}
                </div>
              )}
              <BottomButtons>
                <CancelButton type="button" onClick={() => navigate(-1)} disabled={loadingOrder}>Cancel</CancelButton>
                <OrderNowButton
                  type="submit"
                  disabled={
                    !firstName ||
                    !lastName ||
                    !email ||
                    !address ||
                    cart.length === 0 ||
                    (payment === "paypal" && !paypalPaid) ||
                    loadingOrder
                  }
                >
                  {loadingOrder ? (
                    <span>
                      <span className="loader" style={{
                        display: 'inline-block',
                        width: 18,
                        height: 18,
                        border: '2px solid #fff',
                        borderTop: '2px solid #ff914c',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginRight: 8,
                        verticalAlign: 'middle'
                      }} />
                      Processing...
                      <style>
                        {`
                          @keyframes spin {
                            0% { transform: rotate(0deg);}
                            100% { transform: rotate(360deg);}
                          }
                        `}
                      </style>
                    </span>
                  ) : (
                    "ORDER NOW"
                  )}
                </OrderNowButton>
              </BottomButtons>
            </Form>
          </LeftSection>
          <RightSection>
            <SummaryTitle>Your Order/s</SummaryTitle>
            {cart.length === 0 ? (
              <SummaryRow>No items in cart.</SummaryRow>
            ) : (
              <>
                {cart.map(item => (
                  <SummaryRow key={item.id}>
                    <span>
                      {item.name} x {item.cartQty}
                    </span>
                    <span>₱{(Number(item.price) * Number(item.cartQty)).toLocaleString()}</span>
                  </SummaryRow>
                ))}
                <SummaryRow>
                  <span>Item Total</span>
                  <span>₱{itemTotal.toLocaleString()}</span>
                </SummaryRow>
                <SummaryRow>
                  <span>Shipping</span>
                  <span>₱{shipping.toLocaleString()}</span>
                </SummaryRow>
                <SummaryTotal>
                  <span>TOTAL</span>
                  <span>₱{total.toLocaleString()}</span>
                </SummaryTotal>
              </>
            )}
          </RightSection>
        </FlexLayout>
      </Container>
    </PageContainer>
  );
};

export default Checkout;