function Header({ theme, changeTheme }) {
  return (
    <header>
      <img
        src="https://img.studyclap.com/img/institute/logo/6764d0eb9d-kct-coimbatore.png"
        alt="college logo"
        className="Header-Logo"
      />
      <h1 className="college-name">Kumaraguru College of Technology</h1>

      <label className="theme-toggle">
        <input
          type="checkbox"
          onChange={changeTheme}
          checked={theme}
        />
        <span className="slider"></span>
      </label>
    </header>
  );
}

export default Header;
