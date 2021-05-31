import axios from 'axios';

const indivitualIP = 'http://172.17.226.86:3000';

const testing = () => {
    axios({
        method: 'post',
        url: indivitualIP+'/users/signUp',
        data: {
            'username' : 'mewmew',
            'password' : '123'
        }
      }).then(res => {
            console.log(res);
        })
}

testing();
