import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from '../../mobile_lib/ChatBot.jsx';
// import boticon from './img/boticon.jpeg'
import { ThemeProvider } from 'styled-components';




const theme = {
    background: '#fff',
    botFontColor: '#444',
    // userBubbleColor: '#F5FDFF',
    botBubbleColor: '#F5FDFF',
    headerFontColor: '#004F5F',
    headerBgColor: '#A3D5E1',
    headerFontSize: '18px',
};

class SimpleBot extends Component {
    constructor(props) {
        super(props);
        this.state = {opened:false, width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    toggleFloating = ({ opened }) => {
        this.setState({ opened });
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('focus', this.updateWindowDimensions);
        window.addEventListener('blur', this.updateWindowDimensions);
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('focus', this.updateWindowDimensions);
        window.removeEventListener('blur', this.updateWindowDimensions);
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    client_ip = '0.0.0.0'
    client_age = 18;
    client_gender = 'None'
    client_location = "Moscowww";
    green_points = 0;
    red_points = 0;
    check_virus = -1;

    add_record = (client_status) => {
        fetch(`http://195.19.40.114:4000/add?user_ip=${this.client_ip}&user_age=${this.client_age}&user_gender=${this.client_gender}&user_location=${this.client_location}&user_status=${client_status}`)
            .catch(err => console.error(err))

    }

     get_final_message = () => {

        if (this.check_virus == 0)
        {
            if (this.green_points > 7){
                this.add_record(7);
                return('end_7');
            }
            else if(this.green_points > 0){
                this.add_record(6);
                return('end_6');
            }
            else{
                this.add_record(5);
                return('end_5');
            }
        }
        else if (this.check_virus == 1){
            if(this.red_points > 6)
            {
                this.add_record(3);
                return('end_3');
            }
            else if(this.red_points == 6)
            {
                this.add_record(4);
                return('end_4');
            }
            else if(this.red_points > 0)
            {
                this.add_record(2);
                return('end_2');
            }
            else if(this.red_points == 0)
            {
                this.add_record(1);
                return('end_1');
            }
        }
    };


    incrementValues = (gr_in, red_in) => {
        this.green_points = this.green_points + gr_in;
        this.red_points = this.red_points + red_in;
        // console.log(this.green_points, this.red_points);
    };

    get_client_location = async () => {
        const response = await fetch('http://www.geoplugin.net/json.gp');
        const json = await response.json();

        this.client_ip = json.geoplugin_request;
        this.client_location = (json.geoplugin_regionName);
    };

    render() {
        const { opened } = this.state;
        return (
	<ThemeProvider theme={theme}>
		<ChatBot
                bubbleStyle={{ fontSize: '15px' }}
                width={(this.state.width).toString() + "px"}
                // height={(this.height / 2.8 - 60).toString() + "px"}
                height={(this.state.height).toString() + "px"}
                headerTitle="Самопроверка на коронавирус"
                // hideSubmitButton="false"
                // fullscreen="true"
                botDelay="1400"
                //botDelay="0"
                userDelay ="100"
                placeholder="Напишите сообщение..."
                floating="true"
                opened={ opened }
                botAvatar = "https://sun9-15.userapi.com/tnhm7z5ruIR9HI2tsUiVWoMLtuW_5o79jTWg6w/ysazljwxu84.jpg"
        steps={[
                    {
                        id: 's1',
                        component: (
                            <div>
                            <div class="alert alert-success" role="alert">
                        <h3 class="alert-heading">Здравствуйте!</h3>
                <h6>Этот бот создан для того,
                чтобы помочь вам самостоятельно
                проверить себя на наличие симптомов коронавирусной инфекции COVID-19
                и принять решение о необходимости обращения за медицинской помощью.</h6>
            </div>
            <div class="alert alert-warning mt-2" role="alert">
            <h4>Эта система не предназначена для диагностики или лечения заболеваний.</h4>
        <h6>Для того чтобы начать, нажмите на кнопку ниже.</h6>
        </div>
        </div>
    ),
        trigger: 'q0',
    },
        {
            id: 'q0',
                options: [
            { value: 'true', label: 'Начать', trigger: 's2' },
        ],
        },
        {
            id: 's2',
                message: 'Здравствуйте,\n меня зовут Алексей, я помогу вам пройти этот опрос.',
            trigger: 'i1',
        },
        {
            id: 'i1',
                message: 'Первым делом мне нужно узнать немного о вас.',
            trigger: 'i4',
        },
        {
            id: 'i4',
                message: 'Сколько вам лет?',
            trigger: 'i5',
        },
        {
            id: 'i5',
                user: true,
            validator: (value) => {
            if (isNaN(value)) {
                return 'Введите свой возраст';
            }
            else if (value >= 146 || value <= 2) {
                return 'Введите свой возраст';
            }
            this.client_age = value;
            this.client_location = this.get_client_location();
            // console.log(this.client_location);
            return true;
        },
            trigger: 'i6',
        },
        {
            id: 'i6',
                message: 'Укажите ваш пол.',
            trigger: 'i7',
        },
        {
            id: 'i7',
                options: [
            { value: 'man', label: 'Мужской', trigger: () => {
                    this.client_gender = "Male";
                    return 'i8';
                }},
            { value: 'woman', label: 'Женский', trigger: () => {
                    this.client_gender = "Female";
                    return 'i8';
                }},
        ],
        },
        {
            id: 'i8',
                message: 'А теперь давайте перейдем к опросу.',
            trigger: 'i9',
        },
        {
            id: 'i9',
                message: 'Что вы хотите узнать?',
            trigger:'fork'
        },
        {
            id: 'fork',
                options:[
            { value: "first", label: 'Есть ли у меня симптомы коронавируса', trigger: () => {
                    this.check_virus = 1;
                    return'9';
                }},
            { value: "second", label: 'Нахожусь ли я в группе риска', trigger:()=> {
                    this.check_virus = 0;
                    return'24';
                }},
            ],
        },

        {
            id: '9',
                message: 'Как вы себя чувствуете?',
            trigger: '10',
        },
        {
            id: '10',
                options: [
            { value: "first", label: 'Хорошо или нормально', trigger: () => {
                    this.incrementValues(0, 0);
                    return '13';
                }},
            { value: "second", label: 'Чувствую слабость', trigger: () => {
                    this.incrementValues(0, 1);
                    return '13';
                }},
            { value: "third", label: 'Чувствую заторможенность', trigger: () => {
                    this.incrementValues(0, 3);
                    return '13';
                }},
        ],
        },
        {
            id: '13',
                message: 'Вы дышите так же легко, как обычно?',
            trigger: '14',
        },
        {
            id: '14',
                message: 'Нет ли чувства заложенности в груди, одышки?',
            trigger: '15',
        },
        {
            id: '15',
                options: [
            { value: "first", label: 'Дышу легко', trigger: () => {
                    this.incrementValues(0, 0);
                    return '16';
                }},
            { value: "second", label: 'Есть проблемы с дыханием', trigger: () => {
                    this.incrementValues(0, 3);
                    return '16';
                }},
        ],
        },
        {
            id: '16',
                message: 'Есть ли у вас насморк?',
            trigger: '17',
        },
        {
            id: '17',
                options: [
            { value: "first", label: 'Да', trigger: () => {
                    this.incrementValues(0, 1);
                    return (this.red_points > 6) ? this.get_final_message() : '18';
                }},
            { value: "second", label: 'Нет', trigger: '18' },
        ],
        },
        {
            id: '18',
                message: 'Есть ли у вас першение в горле, кашель?',
            trigger: '19',
        },
        {
            id: '19',
                options: [
            { value: "first", label: 'Да', trigger: () => {
                    this.incrementValues(0, 1);
                    return (this.red_points > 6) ? this.get_final_message() : '20';
                }},
            { value: "second", label: 'Нет', trigger: () => {
                    this.incrementValues(0, 0);
                    return (this.red_points > 6) ? this.get_final_message() : '20';
                }},
        ],
        },
        {
            id: '20',
                message: 'Есть ли у вас боли в мышцах?',
            trigger: '21',
        },
        {
            id: '21',
                options: [
            { value: "first", label: 'Да', trigger: () => {
                    this.incrementValues(0, 1);
                    return (this.red_points > 6) ? this.get_final_message() : '22';
                }},
            { value: "second", label: 'Нет', trigger: () => {
                    this.incrementValues(0, 0);
                    return (this.red_points > 6) ? this.get_final_message() : '22';
                }},
        ],
        },
        {
            id: '22',
                message: 'Какая у вас температура?',
            trigger: '23',
        },
        {
            id: '23',
                options: [
            { value: "fourth", label: 'менее 36.0', trigger: () => {
                    this.incrementValues(0, 2);
                    const result = this.get_final_message();
                    return result;
                }},
            { value: "first", label: 'от 36.0 до 37.1', trigger: () => {
                    this.incrementValues(0, 0);
                    const result = this.get_final_message();
                    return result;
                }},
            { value: "second", label: 'от 37.2 до 38.5', trigger: () => {
                    this.incrementValues(0, 1);
                    const result = this.get_final_message();
                    return result;
                }},
            { value: "third", label: 'более 38.5', trigger: () => {
                    this.incrementValues(0, 2);
                    const result = this.get_final_message();
                    return result;
                }},
        ],
        },
        {
            id: '24',
                message: 'Были ли вы за границей Российской Федерации за последние 14 дней?',
            trigger: '25',
        },
        {
            id: '25',
                options: [
            { value: "first", label: 'Да', trigger: () => {
                    this.incrementValues(1, 0);
                    return '26';
                }},
            { value: "second", label: 'Нет', trigger: () => {
                    this.incrementValues(0, 0);
                    return '26';
                }},
        ],
        },
        {
            id: '26',
                message: 'Встречались ли вы с людьми, недавно приехавшими из-за рубежа, за последние 14 дней?',
            trigger: '27',
        },
        {
            id: '27',
                options: [
            { value: "first", label: 'Да', trigger: () => {
                    this.incrementValues(1, 0);
                    return '28';
                }},
            { value: "second", label: 'Нет', trigger: () => {
                    this.incrementValues(0, 0);
                    return '28';
                }},
            { value: "third", label: 'Не знаю', trigger: () => {
                    this.incrementValues(1, 0);
                    return '28';
                }},
        ],
        },
        {
            id: '28',
                message: 'Есть ли у вас сахарный диабет?',
            trigger: '29',
        },
        {
            id: '29',
                options: [
            { value: "first", label: 'Да', trigger: () => {
                    this.incrementValues(2, 0);
                    return '30';
                }},
            { value: "second", label: 'Нет', trigger: () => {
                    this.incrementValues(0, 0);
                    return '30';
                }},
        ],
        },
        {
            id: '30',
                message: 'Есть ли у вас заболевания сердца (врождённые или приобретённые)?',
            trigger: '31',
        },
        {
            id: '31',
                options: [
            { value: "first", label: 'Да', trigger: () => {
                    this.incrementValues(2, 0);
                    return '32';
                }},
            { value: "second", label: 'Нет', trigger: () => {
                    this.incrementValues(0, 0);
                    return '32';
                }},
        ],
        },
        {
            id: '32',
                message: 'Есть ли у вас заболевания лёгких (врождённые или приобретённые)?',
            trigger: '33',
        },
        {
            id: '33',
                options: [
            { value: "first", label: 'Да', trigger: () => {
                    this.incrementValues(2, 0);
                    return '34';
                }},
            { value: "second", label: 'Нет', trigger: () => {
                    this.incrementValues(0, 0);
                    return '34';
                }},
        ],
        },
        {
            id: '34',
                message: 'Вы курите? Если да, то как долго?',
            trigger: '35',
        },
        {
            id: '35',
                options: [
            { value: "frist", label: 'Да, более 10 лет', trigger: () => {
                    this.incrementValues(1, 0);
                    return '36';
                }},
            { value: "second", label: 'Да, менее 10 лет', trigger: () => {
                    this.incrementValues(0, 0);
                    return '36';
                }},
            { value: "third", label: 'Нет, не курю', trigger: () => {
                    this.incrementValues(0, 0);
                    return '36';
                }},
        ],
        },
        {
            id: '36',
                message: 'Есть ли у вас онкологические заболевания?',
            trigger: '37',
        },
        {
            id: '37',
                options: [
            { value: "first", label: 'Да', trigger: () => {
                    this.incrementValues(2, 0);
                    return '38';
                }},
            { value: "second", label: 'Нет', trigger: () => {
                    this.incrementValues(0, 0);
                    return '38';
                }},
        ],
        },
        {
            id: '38',
                message: 'Вам выполнялась трансплантация органов или тканей?',
            trigger: '39',
        },
        {
            id: '39',
                options: [
            { value: "first", label: 'Да', trigger: () => {
                    this.incrementValues(2, 0);
                    return '40';
                }},
            { value: "second", label: 'Нет', trigger: () => {
                    this.incrementValues(0, 0);
                    return '40';
                }},
        ],
        },
        {
            id: '40',
                message: 'Есть ли у вас другие хронические заболевания?',
            trigger: '41',
        },
        {
            id: '41',
                options: [
            { value: "first", label: 'Да', trigger: () => {
                    this.incrementValues(1, 0);
                    const result = this.get_final_message();
                    return result;
                }},
            { value: "second", label: 'Нет', trigger: () => {
                    this.incrementValues(0, 0);
                    const result = this.get_final_message();
                    return result;
                }},
        ],
        },
        {
            id: 'end_1',

                component : (
        <div class="alert alert-success" role="alert">
            <h4>Судя по вашим ответам, <b>у вас нет симптомов коронавируса.</b></h4>
        <h6>Оставайтесь дома, не ходите в гости. </h6>
        <h6>Это необходимо, чтобы минимизировать возможность заражения.</h6>
        <h6>Если у вас остались какие-то вопросы, обратитесь в поликлинику.</h6>
        </div>),
            end: true,
        },
        {
            id: 'end_2',
                component : (
        <div class = "alert alert-warning" role = "alert">
            <h4><b>У вас есть симптомы ОРВИ</b> </h4>
        <h6>Судя по вашим ответам, болезнь протекает в легкой форме. Оставайтесь дома и наблюдайте за 
        симптомами.<br />Вызовите скорую по телефону 103 или 112, если вам станет хуже.</h6>
        </div>),
            end: true,
        },
        {
            id: 'end_3',
                component: (
        <div class = "alert alert-danger" role = "alert">
            <h4>Вам нужно вызвать скорую помощь по номеру <strong>103</strong> или <strong>112</strong></h4>
        <h6>Ваше состояние может быть крайне нестабильно.<br />
        Сообщите оператору, если вы контактировали с кем-то у кого был обнаружен коронавирус или если вы недавно
            выезжали за пределы Российской Федерации.</h6>
        </div>),
            end: true,
        },
        {
            id: 'end_4',
                component: (
        <div class = "alert alert-danger" role = "alert">
        <h4><b>У вас есть симптомы ОРВИ</b> </h4><br />
        <h6>Вам нужно вызывать скорую помощь по номеру <strong>103</strong> или <strong>112</strong></h6>
        </div>),
            end: true,
        },
        
        {
            id: 'end_5',
                component : (
        <div class="alert alert-success" role="alert">
            <h4>У вас <b>низкий</b> риск заражения вирусом</h4>
        <h6>Однако по возможности оставайтесь дома. Не ходите в гости, не выезжайте на природу.<br />
        Это необходимо, чтобы защитить вас от вируса и снизить нагрузку на больницы.</h6>
        </div>),
            end: true,
        },
        
        {
            id: 'end_6',
                component: (
        <div class="alert alert-warning" role="alert">
            <h4>У вас <b>повышенный</b> риск заражения вирусом.</h4>
        <h6>Оставайтесь дома, не нарушайте режим самоизоляции.</h6>
        <h6><b>Вызовите врача, если появятся симптомы вируса:</b></h6>
        <h6>- повышенная температура</h6>
        <h6>- кашель</h6>
        <h6>- одышка</h6>
        <h6>- боли в мышцах и в груди</h6>
        </div>),
            end: true,
        },
        
        {
            id: 'end_7',
                component: (
        <div class="alert alert-warning" role="alert">
            <h4>У вас <b>высокий</b> риск заражения коронавирусом.</h4>
        <h6>Оставайтесь дома, не нарушайте режим самоизоляции.</h6><br />
        <h6>Продукты и лекарства заказывайте через интернет с доставкой,
        воспользуйтесь услугами волонтеров. Заражение вирусом может привести к <b>худшим </b>
        последствиям для вас.</h6>
        <h6>Вызовите врача, если появятся симптомы вируса:</h6>
        <h6>- повышенная температура</h6>
        <h6>- кашель</h6>
        <h6>- одышка</h6>
        <h6>- боли в мышцах и в груди</h6>
        </div>),
            end: true,
        },
    ]}

        />
        </ThemeProvider>
    );
    }
}

SimpleBot.propTypes = {
    steps: PropTypes.object,
};

SimpleBot.defaultProps = {
    steps: undefined,
};

export default SimpleBot;
