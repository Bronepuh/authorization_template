import './test-page.css';

const TestPage = () => {

  return (
    <div className='test-wrapper'>
      <div className="overlay"></div>
      <div className="scanline"></div>
      <div className="wrapper">
        <div className="content clearfix">

          <header className="site clearfix">
            <div className="col one">
              <img src="https://assets.codepen.io/2856/Logo_591Design_2015-12-01.png" alt="591 Systems" width="300" height="300" id="logo-v" />
            </div>
            <div className="col two">
              <h4>591 Systems (tm) <br /> <b>H</b>euristically <b>E</b>ncrypted <b>R</b>ealtime <b>O</b>perating <b>S</b>ystem (HEROS)</h4>
              <p>----------------------------------------</p>
              <p>HEROS v 1.0.0</p>
              <p>(c)2022 591 Industries</p>
              <p>- Server 591 -</p>
            </div>
          </header>

          <nav className="site clear">
            <ul>
              <li><a href="#" title="">Return Home</a></li>
              <li><a href="#" title="">Our Clients</a></li>
              <li><a href="#" title="">Contact Us</a></li>
            </ul>
          </nav>

          <p>System Administrator Integrated Message System (SAIMS)</p>
          <p>System Administrator (SYSADM) - Mack Richardson</p>

          <p className="clear"><br /></p>

          <p>Welcome to the System Administrator Integrated Message System (SAIMS). Fill out the fields below and press the SUBMIT button. The system administrator (SYSADM) will respond to your query after an appropriate amount of quiet contemplation. Thank you for contacting the System Administrator's Office.</p><br />

          <form>
            <label>{'Name >>'}</label><input className='test-input' type="text" /><br />
            <label>{'Email >>'}</label><input className='test-input' type="text" /><br />
            <label>{'Subject >>'}</label><input className='test-input' type="text" /><br />
            <label>{'Message >>'}</label><textarea id="text" rows={1}></textarea><br /><br /><br />
            <input type="submit" className='test-input' value="Submit" />
            <a className="button" href="index.html">Cancel</a>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TestPage