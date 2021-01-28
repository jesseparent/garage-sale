import React, { useEffect, useState } from 'react';
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_ACTIVE_ALERT } from '../../utils/queries';
import { CANCEL_ALERT } from '../../utils/mutations';

const Nav = () => {
  const userId = Auth.getUserId();
  const { loading, data } = useQuery(QUERY_ACTIVE_ALERT, { variables: { _id: userId } });
  const [cancelAlert] = useMutation(CANCEL_ALERT);

  const [showCancel, setShowCancel] = useState(false);
  const [meetingId, setMeetingId] = useState('');

  const handleCancelAlert = async event => {
    await cancelAlert({ variables: { _id: meetingId } })

    setShowCancel(false);
  }

  function displayCancelAlert() {
    if (showCancel) {
      return (
        <li>
          <Link onClick={handleCancelAlert}>Cancel Alert</Link>
        </li>
      );
    }
    else {
      return;
    }
  }

  useEffect(() => {
    if (!loading && data?.meeting) {
      setShowCancel(true);
      setMeetingId(data.meeting._id)
    }
    else {
      setShowCancel(false);
      setMeetingId('');
    }
  }, [loading, data, setShowCancel, setMeetingId]);

  useEffect(() => {
    // Refresh Nav if Alert Cancelled
  }, [cancelAlert]);

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="nav-links">
          {displayCancelAlert()}
          <li>
            <a href="/chat">Messages</a>
          </li>
          <li>
            <a href="/addproduct">Sell</a>
          </li>
          <li>
            <a href="/" onClick={() => Auth.logout()}>Logout</a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="nav-links">
          <li>
            <a href="/signup">Sign Up</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
        </ul>
      );
    }
  }

  return (
    <nav className="navbar">
      <h1 className="page-title">
        <a href="/">Garage Sale</a>
        {/* <img src={NavImg} alt="for sale" /> */}
      </h1>
      <h3 className="title-description">
        Your one stop to buy and sell locally!
      </h3>
      {showNavigation()}
      <div className="burger">
        <div className="line-1"></div>
        <div className="line-2"></div>
        <div className="line-3"></div>
      </div>
    </nav>
  );
};
export default Nav;
