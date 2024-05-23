import { Link } from 'react-router-dom';
import { Row } from 'antd';
import PropTypes from 'prop-types';

function SourceCode({ value }) {
  return (
    <Row align="middle" justify="center">
      <Link to={value} target="_blank">
        &lt;/&gt; Source Code
      </Link>
    </Row>
  );
}

SourceCode.propTypes = {
  value: PropTypes.string.isRequired,
};

export default SourceCode;