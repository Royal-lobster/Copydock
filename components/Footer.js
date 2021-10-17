import React from "react";

function Footer() {
  return (
    <>
      <footer className="footer">
        <p>
          Made by <a href="https://srujangurram.me">Srujan</a>
        </p>
      </footer>

      <style jsx>{`
        .footer {
          width: 100%;
          margin-top: auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .footer p {
          width: 100%;
          text-align: center;
          font-size: 18px;
          border-radius: 4px;
          padding: 10px;
          color: #ccc;
          max-width: 800px;
          background-color: #0000002d;
          margin: 20px 0;
        }
        .footer p a {
          color: #ccc;
          border-bottom: 1px dotted #ccc;
          padding-bottom: 1px;
        }
        @media only screen and (max-width: 500px) {
          .footer {
            border-radius: 0px;
          }
          .footer p {
            font-size: 16px;
            margin: 0;
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
}

export default Footer;
