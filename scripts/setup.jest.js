import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

let adapter = new Adapter();
Enzyme.configure({ adapter });
