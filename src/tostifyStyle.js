// toast style object
// toast style object
// toast style object
export const toastStyleObject = () => {
  const isMobile = window.innerWidth <= 600;

  return {
    position: isMobile ? "top-center" : "bottom-left",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    style: {
      fontFamily: "AndaleMono",
      backgroundColor: "#ffffff",
      color: "#0f172a",
      fontSize: "13px",
      minWidth: "200px",
      maxWidth: "92vw",
      textAlign: "center",
      padding: isMobile ? "12px 14px" : "14px 18px",
      marginTop: isMobile ? "1.5rem" : undefined,
      borderRadius: "10px",
      boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
      border: "1px solid rgba(15,23,42,0.04)",
    },
  };
};
