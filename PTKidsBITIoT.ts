/**
 * Functions are mapped to blocks using various macros
 * in comments starting with %. The most important macro
 * is "block", and it specifies that a block should be
 * generated for an **exported** function.
 */

let Sensor_PIN: number[] = []
let Sensor_Left: number[] = []
let Sensor_Right: number[] = []
let Num_Sensor = 0
let LED_PIN = 0

let PCA = 0x40
let initI2C = false
let SERVOS = 0x06
let Line_LOW = [0, 0, 0, 0, 0, 0, 0, 0]
let Line_HIGH = [0, 0, 0, 0, 0, 0, 0, 0]
let Color_Line: number[] = []
let Color_Background: number[] = []
let Color_Line_Left: number[] = []
let Color_Background_Left: number[] = []
let Color_Line_Right: number[] = []
let Color_Background_Right: number[] = []
let Line_Mode = 0
let Last_Position = 0
let error = 0
let P = 0
let D = 0
let previous_error = 0
let PD_Value = 0
let left_motor_speed = 0
let right_motor_speed = 0

enum Motor_Write {
    //% block="1"
    Motor_1,
    //% block="2"
    Motor_2
}

enum _Turn {
    //% block="Left"
    Left,
    //% block="Right"
    Right
}

enum _Spin {
    //% block="Left"
    Left,
    //% block="Right"
    Right
}

enum Servo_Write {
    //% block="S0"
    S0,
    //% block="S1"
    S1,
    //% block="S2"
    S2,
    //% block="S3"
    S3,
    //% block="S4"
    S4,
    //% block="S5"
    S5,
    //% block="S6"
    S6,
    //% block="S7"
    S7
}

enum Servo_Mode {
    //% block="Release"
    Release,
    //% block="Lock"
    Lock
}

enum Button_Status {
    //% block="Pressed"
    Pressed,
    //% block="Released"
    Released
}

enum Button_Pin {
    //% block="P1"
    P1,
    //% block="P2"
    P2
}

enum ADC_Read {
    //% block="0"
    ADC0 = 0x84,
    //% block="1"
    ADC1 = 0xC4,
    //% block="2"
    ADC2 = 0x94,
    //% block="3"
    ADC3 = 0xD4,
    //% block="4"
    ADC4 = 0xA4,
    //% block="5"
    ADC5 = 0xE4,
    //% block="6"
    ADC6 = 0xB4,
    //% block="7"
    ADC7 = 0xF4
}

enum DHT11_Read{
    //% block="Temperature(℃)"
    Temperature_C,
    //% block="Temperature(℉)"
    Temperature_F,
    //% block="Humidity(0~100)"
    Humidity
}

enum DHT11_Pin {
    //% block="P1"
    P1,
    //% block="P2"
    P2
}

enum Forward_Direction {
    //% block="Forward"
    Forward,
    //% block="Backward"
    Backward
}

enum Find_Line {
    //% block="Left"
    Left,
    //% block="Center"
    Center,
    //% block="Right"
    Right
}

enum LED_Pin {
    //% block="Disable"
    Disable,
    //% block="P1"
    P1,
    //% block="P2"
    P2,
    //% block="P8"
    P8,
    //% block="P12"
    P12
}

enum Turn_Line {
    //% block="Left"
    Left,
    //% block="Right"
    Right
}

enum Virtual_Pin {
    //% block="V0"
    V0 = 0,
    //% block="V1"
    V1 = 1,
    //% block="V2"
    V2 = 2,
    //% block="V3"
    V3 = 3,
    //% block="V4"
    V4 = 4,
    //% block="V5"
    V5 = 5,
    //% block="V6"
    V6 = 6,
    //% block="V7"
    V7 = 7,
    //% block="V8"
    V8 = 8,
    //% block="V9"
    V9 = 9,
    //% block="V10"
    V10 = 10,
    //% block="V11"
    V11 = 11,
    //% block="V12"
    V12 = 12,
    //% block="V13"
    V13 = 13,
    //% block="V14"
    V14 = 14,
    //% block="V15"
    V15 = 15,
    //% block="V16"
    V16 = 16,
    //% block="V17"
    V17 = 17,
    //% block="V18"
    V18 = 18,
    //% block="V19"
    V19 = 19,
    //% block="V20"
    V20 = 20,
    //% block="V21"
    V21 = 21,
    //% block="V22"
    V22 = 22,
    //% block="V23"
    V23 = 23,
    //% block="V24"
    V24 = 24,
    //% block="V25"
    V25 = 25,
    //% block="V26"
    V26 = 26,
    //% block="V27"
    V27 = 27,
    //% block="V28"
    V28 = 28,
    //% block="V29"
    V29 = 29,
    //% block="V30"
    V30 = 30,
    //% block="V31"
    V31 = 31,
    //% block="V32"
    V32 = 32,
    //% block="V33"
    V33 = 33,
    //% block="V34"
    V34 = 34,
    //% block="V35"
    V35 = 35,
    //% block="V36"
    V36 = 36,
    //% block="V37"
    V37 = 37,
    //% block="V38"
    V38 = 38,
    //% block="V39"
    V39 = 39,
    //% block="V40"
    V40 = 40,
    //% block="V41"
    V41 = 41,
    //% block="V42"
    V42 = 42,
    //% block="V43"
    V43 = 43,
    //% block="V44"
    V44 = 44,
    //% block="V45"
    V45 = 45,
    //% block="V46"
    V46 = 46,
    //% block="V47"
    V47 = 47,
    //% block="V48"
    V48 = 48,
    //% block="V49"
    V49 = 49,
    //% block="V50"
    V50 = 50,
    //% block="V51"
    V51 = 51,
    //% block="V52"
    V52 = 52,
    //% block="V53"
    V53 = 53,
    //% block="V54"
    V54 = 54,
    //% block="V55"
    V55 = 55,
    //% block="V56"
    V56 = 56,
    //% block="V57"
    V57 = 57,
    //% block="V58"
    V58 = 58,
    //% block="V59"
    V59 = 59,
    //% block="V60"
    V60 = 60,
    //% block="V61"
    V61 = 61,
    //% block="V62"
    V62 = 62,
    //% block="V63"
    V63 = 63,
    //% block="V64"
    V64 = 64,
    //% block="V65"
    V65 = 65,
    //% block="V66"
    V66 = 66,
    //% block="V67"
    V67 = 67,
    //% block="V68"
    V68 = 68,
    //% block="V69"
    V69 = 69,
    //% block="V70"
    V70 = 70,
    //% block="V71"
    V71 = 71,
    //% block="V72"
    V72 = 72,
    //% block="V73"
    V73 = 73,
    //% block="V74"
    V74 = 74,
    //% block="V75"
    V75 = 75,
    //% block="V76"
    V76 = 76,
    //% block="V77"
    V77 = 77,
    //% block="V78"
    V78 = 78,
    //% block="V79"
    V79 = 79,
    //% block="V80"
    V80 = 80,
    //% block="V81"
    V81 = 81,
    //% block="V82"
    V82 = 82,
    //% block="V83"
    V83 = 83,
    //% block="V84"
    V84 = 84,
    //% block="V85"
    V85 = 85,
    //% block="V86"
    V86 = 86,
    //% block="V87"
    V87 = 87,
    //% block="V88"
    V88 = 88,
    //% block="V89"
    V89 = 89,
    //% block="V90"
    V90 = 90,
    //% block="V91"
    V91 = 91,
    //% block="V92"
    V92 = 92,
    //% block="V93"
    V93 = 93,
    //% block="V94"
    V94 = 94,
    //% block="V95"
    V95 = 95,
    //% block="V96"
    V96 = 96,
    //% block="V97"
    V97 = 97,
    //% block="V98"
    V98 = 98,
    //% block="V99"
    V99 = 99,
    //% block="V100"
    V100 = 100,
    //% block="V101"
    V101 = 101,
    //% block="V102"
    V102 = 102,
    //% block="V103"
    V103 = 103,
    //% block="V104"
    V104 = 104,
    //% block="V105"
    V105 = 105,
    //% block="V106"
    V106 = 106,
    //% block="V107"
    V107 = 107,
    //% block="V108"
    V108 = 108,
    //% block="V109"
    V109 = 109,
    //% block="V110"
    V110 = 110,
    //% block="V111"
    V111 = 111,
    //% block="V112"
    V112 = 112,
    //% block="V113"
    V113 = 113,
    //% block="V114"
    V114 = 114,
    //% block="V115"
    V115 = 115,
    //% block="V116"
    V116 = 116,
    //% block="V117"
    V117 = 117,
    //% block="V118"
    V118 = 118,
    //% block="V119"
    V119 = 119,
    //% block="V120"
    V120 = 120,
    //% block="V121"
    V121 = 121,
    //% block="V122"
    V122 = 122,
    //% block="V123"
    V123 = 123,
    //% block="V124"
    V124 = 124,
    //% block="V125"
    V125 = 125,
    //% block="V126"
    V126 = 126,
    //% block="V127"
    V127 = 127,
    //% block="V128"
    V128 = 128,
    //% block="V129"
    V129 = 129,
    //% block="V130"
    V130 = 130,
    //% block="V131"
    V131 = 131,
    //% block="V132"
    V132 = 132,
    //% block="V133"
    V133 = 133,
    //% block="V134"
    V134 = 134,
    //% block="V135"
    V135 = 135,
    //% block="V136"
    V136 = 136,
    //% block="V137"
    V137 = 137,
    //% block="V138"
    V138 = 138,
    //% block="V139"
    V139 = 139,
    //% block="V140"
    V140 = 140,
    //% block="V141"
    V141 = 141,
    //% block="V142"
    V142 = 142,
    //% block="V143"
    V143 = 143,
    //% block="V144"
    V144 = 144,
    //% block="V145"
    V145 = 145,
    //% block="V146"
    V146 = 146,
    //% block="V147"
    V147 = 147,
    //% block="V148"
    V148 = 148,
    //% block="V149"
    V149 = 149,
    //% block="V150"
    V150 = 150,
    //% block="V151"
    V151 = 151,
    //% block="V152"
    V152 = 152,
    //% block="V153"
    V153 = 153,
    //% block="V154"
    V154 = 154,
    //% block="V155"
    V155 = 155,
    //% block="V156"
    V156 = 156,
    //% block="V157"
    V157 = 157,
    //% block="V158"
    V158 = 158,
    //% block="V159"
    V159 = 159,
    //% bl1ock="V160"
    V160 = 160,
    //% bl1ock="V161"
    V161 = 161,
    //% block="V162"
    V162 = 162,
    //% block="V163"
    V163 = 163,
    //% block="V164"
    V164 = 164,
    //% block="V165"
    V165 = 165,
    //% block="V166"
    V166 = 166,
    //% block="V167"
    V167 = 167,
    //% block="V168"
    V168 = 168,
    //% block="V169"
    V169 = 169,
    //% block="V170"
    V170 = 170,
    //% block="V171"
    V171 = 171,
    //% block="V172"
    V172 = 172,
    //% block="V173"
    V173 = 173,
    //% block="V174"
    V174 = 174,
    //% block="V175"
    V175 = 175,
    //% block="V176"
    V176 = 176,
    //% block="V177"
    V177 = 177,
    //% block="V178"
    V178 = 178,
    //% block="V179"
    V179 = 179,
    //% block="V180"
    V180 = 180,
    //% block="V181"
    V181 = 181,
    //% block="V182"
    V182 = 182,
    //% block="V183"
    V183 = 183,
    //% block="V184"
    V184 = 184,
    //% block="V185"
    V185 = 185,
    //% block="V186"
    V186 = 186,
    //% block="V187"
    V187 = 187,
    //% block="V188"
    V188 = 188,
    //% block="V189"
    V189 = 189,
    //% block="V190"
    V190 = 190,
    //% block="V191"
    V191 = 191,
    //% block="V192"
    V192 = 192,
    //% block="V193"
    V193 = 193,
    //% block="V194"
    V194 = 194,
    //% block="V195"
    V195 = 195,
    //% block="V196"
    V196 = 196,
    //% block="V197"
    V197 = 197,
    //% block="V198"
    V198 = 198,
    //% block="V199"
    V199 = 199,
    //% block="V200"
    V200 = 200,
    //% block="V201"
    V201 = 201,
    //% block="V202"
    V202 = 202,
    //% block="V203"
    V203 = 203,
    //% block="V204"
    V204 = 204,
    //% block="V205"
    V205 = 205,
    //% block="V206"
    V206 = 206,
    //% block="V207"
    V207 = 207,
    //% block="V208"
    V208 = 208,
    //% block="V209"
    V209 = 209,
    //% block="V210"
    V210 = 210,
    //% block="V211"
    V211 = 211,
    //% block="V212"
    V212 = 212,
    //% block="V213"
    V213 = 213,
    //% block="V214"
    V214 = 214,
    //% block="V215"
    V215 = 215,
    //% block="V216"
    V216 = 216,
    //% block="V217"
    V217 = 217,
    //% block="V218"
    V218 = 218,
    //% block="V219"
    V219 = 219,
    //% block="V220"
    V220 = 220,
    //% block="V221"
    V221 = 221,
    //% block="V222"
    V222 = 222,
    //% block="V223"
    V223 = 223,
    //% block="V224"
    V224 = 224,
    //% block="V225"
    V225 = 225,
    //% block="V226"
    V226 = 226,
    //% block="V227"
    V227 = 227,
    //% block="V228"
    V228 = 228,
    //% block="V229"
    V229 = 229,
    //% block="V230"
    V230 = 230,
    //% block="V231"
    V231 = 231,
    //% block="V232"
    V232 = 232,
    //% block="V233"
    V233 = 233,
    //% block="V234"
    V234 = 234,
    //% block="V235"
    V235 = 235,
    //% block="V236"
    V236 = 236,
    //% block="V237"
    V237 = 237,
    //% block="V238"
    V238 = 238,
    //% block="V239"
    V239 = 239,
    //% block="V240"
    V240 = 240,
    //% block="V241"
    V241 = 241,
    //% block="V242"
    V242 = 242,
    //% block="V243"
    V243 = 243,
    //% block="V244"
    V244 = 244,
    //% block="V245"
    V245 = 245,
    //% block="V246"
    V246 = 246,
    //% block="V247"
    V247 = 247,
    //% block="V248"
    V248 = 248,
    //% block="V249"
    V249 = 249,
    //% block="V250"
    V250 = 250,
    //% block="V251"
    V251 = 251,
    //% block="V252"
    V252 = 252,
    //% block="V253"
    V253 = 253,
    //% block="V254"
    V254 = 254,
    //% block="V255"
    V255 = 255
}

//% color="#2ACAEA" icon="\u2B9A"
namespace PTKidsBITIoT {
    function initPCA(): void {
        let i2cData = pins.createBuffer(2)
        initI2C = true
        i2cData[0] = 0
        i2cData[1] = 0x10
        pins.i2cWriteBuffer(PCA, i2cData, false)

        i2cData[0] = 0xFE
        i2cData[1] = 101
        pins.i2cWriteBuffer(PCA, i2cData, false)

        i2cData[0] = 0
        i2cData[1] = 0x81
        pins.i2cWriteBuffer(PCA, i2cData, false)

        for (let servo = 0; servo < 16; servo++) {
            i2cData[0] = SERVOS + servo * 4 + 0
            i2cData[1] = 0x00

            i2cData[0] = SERVOS + servo * 4 + 1
            i2cData[1] = 0x00
            pins.i2cWriteBuffer(PCA, i2cData, false);
        }
    }

    function setServoPCA(servo: number, angle: number): void {
        if (initI2C == false) {
            initPCA()
        }
        let i2cData = pins.createBuffer(2)
        let start = 0
        let angle_input = pins.map(angle, 0, 180, -90, 90)
        angle = Math.max(Math.min(90, angle_input), -90)
        let stop = 369 + angle * 235 / 90
        i2cData[0] = SERVOS + servo * 4 + 2
        i2cData[1] = (stop & 0xff)
        pins.i2cWriteBuffer(PCA, i2cData, false)

        i2cData[0] = SERVOS + servo * 4 + 3
        i2cData[1] = (stop >> 8)
        pins.i2cWriteBuffer(PCA, i2cData, false)
    }

    //% group="Motor Control"
    /**
     * Stop all Motor
     */
    //% block="Motor Stop"
    export function motorStop(): void {
        pins.digitalWritePin(DigitalPin.P13, 1)
        pins.analogWritePin(AnalogPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.analogWritePin(AnalogPin.P16, 0)
    }

    //% group="Motor Control"
    /**
     * Spin the Robot to Left or Right. The speed motor is adjustable between 0 to 100.
     */
    //% block="Spin %_Spin|Speed %Speed"
    //% speed.min=0 speed.max=100
    export function Spin(spin: _Spin, speed: number): void {
        speed = pins.map(speed, 0, 100, 0, 1023)

        if (spin == _Spin.Left) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, speed)
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, speed)
        }
        else if (spin == _Spin.Right) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, speed)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, speed)
        }
    }

    //% group="Motor Control"
    /**
     * Turn the Robot to Left or Right. The speed motor is adjustable between 0 to 100.
     */
    //% block="Turn %_Turn|Speed %Speed"
    //% speed.min=0 speed.max=100
    export function Turn(turn: _Turn, speed: number): void {
        speed = pins.map(speed, 0, 100, 0, 1023)

        if (turn == _Turn.Left) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, 0)
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, speed)
        }
        else if (turn == _Turn.Right) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, speed)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, 0)
        }
    }

    //% group="Motor Control"
    /**
     * Control motors speed both at the same time. The speed motors is adjustable between -100 to 100.
     */
    //% block="Motor1 %Motor1|Motor2 %Motor2"
    //% speed1.min=-100 speed1.max=100
    //% speed2.min=-100 speed2.max=100
    export function motorGo(speed1: number, speed2: number): void {
        speed1 = pins.map(speed1, -100, 100, -1023, 1023)
        speed2 = pins.map(speed2, -100, 100, -1023, 1023)

        if (speed1 < 0) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, -speed1)
        }
        else if (speed1 >= 0) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, speed1)
        }

        if (speed2 < 0) {
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, -speed2)
        }
        else if (speed2 >= 0) {
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, speed2)
        }
    }

    //% group="Motor Control"
    /**
     * Control motor speed 1 channel. The speed motor is adjustable between -100 to 100.
     */
    //% block="motorWrite %Motor_Write|Speed %Speed"
    //% speed.min=-100 speed.max=100
    export function motorWrite(motor: Motor_Write, speed: number): void {
        speed = pins.map(speed, -100, 100, -1023, 1023)

        if (motor == Motor_Write.Motor_1) {
            if (speed < 0) {
                pins.digitalWritePin(DigitalPin.P13, 0)
                pins.analogWritePin(AnalogPin.P14, -speed)
            }
            else if (speed >= 0) {
                pins.digitalWritePin(DigitalPin.P13, 1)
                pins.analogWritePin(AnalogPin.P14, speed)
            }
        }
        else if (motor == Motor_Write.Motor_2) {
            if (speed < 0) {
                pins.digitalWritePin(DigitalPin.P15, 0)
                pins.analogWritePin(AnalogPin.P16, -speed)
            }
            else if (speed >= 0) {
                pins.digitalWritePin(DigitalPin.P15, 1)
                pins.analogWritePin(AnalogPin.P16, speed)
            }
        }
    }

    //% group="Servo Control"
    /**
     * Control Servo Motor 0 - 180 Degrees
     */
    //% block="Servo %Servo_Write|Degree %Degree"
    //% degree.min=0 degree.max=180
    export function servoWrite(servo: Servo_Write, degree: number): void {
        if (servo == Servo_Write.S0) {
            setServoPCA(0, degree)
        }
        else if (servo == Servo_Write.S1) {
            setServoPCA(1, degree)
        }
        else if (servo == Servo_Write.S2) {
            setServoPCA(2, degree)
        }
        else if (servo == Servo_Write.S3) {
            setServoPCA(3, degree)
        }
        else if (servo == Servo_Write.S4) {
            setServoPCA(4, degree)
        }
        else if (servo == Servo_Write.S5) {
            setServoPCA(5, degree)
        }
        else if (servo == Servo_Write.S6) {
            setServoPCA(6, degree)
        }
        else if (servo == Servo_Write.S7) {
            setServoPCA(7, degree)
        }
    }

    //% group="Sensor and ADC"
    /**
     * Read DHT11 Value
     */
    //% block="DHT11Read $dht_type|Pin %pin"
    export function DHT11Read(dht_type: DHT11_Read, pin: DHT11_Pin): number {
        basic.pause(10)
        let _temperature: number = -999.0
        let _humidity: number = -999.0
        let checksum: number = 0
        let checksumTmp: number = 0
        let dataArray: boolean[] = []
        let resultArray: number[] = []
        for (let index = 0; index < 40; index++) dataArray.push(false)
        for (let index = 0; index < 5; index++) resultArray.push(0)

        if (pin = DHT11_Pin.P1) {
            pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
            pins.digitalWritePin(DigitalPin.P1, 0)
            basic.pause(18)
            pins.digitalReadPin(DigitalPin.P1)
            control.waitMicros(40)
            while (pins.digitalReadPin(DigitalPin.P1) == 0);
            while (pins.digitalReadPin(DigitalPin.P1) == 1);

            for (let index = 0; index < 40; index++) {
                while (pins.digitalReadPin(DigitalPin.P1) == 1);
                while (pins.digitalReadPin(DigitalPin.P1) == 0);
                control.waitMicros(28)
                if (pins.digitalReadPin(DigitalPin.P1) == 1) dataArray[index] = true
            }
        }
        else if (pin = DHT11_Pin.P2) {
            pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
            pins.digitalWritePin(DigitalPin.P2, 0)
            basic.pause(18)
            pins.digitalReadPin(DigitalPin.P2)
            control.waitMicros(40)
            while (pins.digitalReadPin(DigitalPin.P2) == 0);
            while (pins.digitalReadPin(DigitalPin.P2) == 1);

            for (let index = 0; index < 40; index++) {
                while (pins.digitalReadPin(DigitalPin.P2) == 1);
                while (pins.digitalReadPin(DigitalPin.P2) == 0);
                control.waitMicros(28)
                if (pins.digitalReadPin(DigitalPin.P2) == 1) dataArray[index] = true
            }
        }

        for (let index = 0; index < 5; index++)
            for (let index2 = 0; index2 < 8; index2++)
                if (dataArray[8 * index + index2]) resultArray[index] += 2 ** (7 - index2)

        checksumTmp = resultArray[0] + resultArray[1] + resultArray[2] + resultArray[3]
        checksum = resultArray[4]
        if (checksumTmp >= 512) checksumTmp -= 512
        if (checksumTmp >= 256) checksumTmp -= 256
        switch (dht_type) {
            case DHT11_Read.Temperature_C:
                _temperature = resultArray[2] + resultArray[3] / 100
                return _temperature
            case DHT11_Read.Temperature_F:
                _temperature = resultArray[2] + resultArray[3] / 100
                _temperature = _temperature * 1.8 + 32
                return _temperature
            case DHT11_Read.Humidity:
                _humidity = resultArray[0] + resultArray[1] / 100
                return _humidity
        }
        return 0
    }

    //% group="Sensor and ADC"
    /**
     * Read Analog from ADC Channel
     */
    //% block="ADCRead %ADC_Read"
    export function ADCRead(ADCRead: ADC_Read): number {
        pins.i2cWriteNumber(0x48, ADCRead, NumberFormat.UInt8LE, false)
        return ADCRead = pins.i2cReadNumber(0x48, NumberFormat.UInt16BE, false)
    }

    //% group="Sensor and ADC"
    /**
     * Wait for the button to be pressed or released.
     */
    //% block="WaitButton %Button_Pin|is %Button_Status"
    //% speed.min=-100 speed.max=100
    export function waitClick(button_pin: Button_Pin, button_status: Button_Status): void {
        if (button_status == Button_Status.Pressed) {
            if (button_pin == Button_Pin.P1) {
                while (pins.digitalReadPin(DigitalPin.P1) == 0);
            }
            else if (button_pin == Button_Pin.P2) {
                while (pins.digitalReadPin(DigitalPin.P2) == 0);
            }
        }
        else {
            if (button_pin == Button_Pin.P1) {
                while (pins.digitalReadPin(DigitalPin.P1) == 1);
            }
            else if (button_pin == Button_Pin.P2) {
                while (pins.digitalReadPin(DigitalPin.P2) == 1);
            }
        }
    }

    //% group="WiFi"
    /**
     * Disconnect WiFi
     */
    //% block="disconnectWiFi"
    export function disconnectWiFi() {
        serial.redirect(
            SerialPin.P8,
            SerialPin.P12,
            BaudRate.BaudRate115200
        )
        serial.setWriteLinePadding(0)
        serial.setTxBufferSize(200)
        serial.setRxBufferSize(200)
        serial.writeLine("WIFI_DISCONNECT")
        while (!(serial.readLine().includes("DISCONNECTED")));
        serial.redirectToUSB()
    }

    //% group="WiFi"
    /**
     * Check WiFi status
     */
    //% block="statusWiFi"
    export function statusWiFi() {
        let inputString = ""
        serial.redirect(
            SerialPin.P8,
            SerialPin.P12,
            BaudRate.BaudRate115200
        )
        serial.setWriteLinePadding(0)
        serial.setTxBufferSize(200)
        serial.setRxBufferSize(200)
        serial.writeLine("WIFI_STATUS")
        while (inputString.length == 0) {
            inputString = serial.readLine()
        }
        serial.redirectToUSB()
        return inputString
    }

    //% group="WiFi"
    /**
     * Connect WiFi
     */
    //% block="connectWiFi %SSID|Password %Password"
    export function connectWiFi(ssid: string, password: string): void {
        serial.redirect(
            SerialPin.P8,
            SerialPin.P12,
            BaudRate.BaudRate115200
        )
        serial.setWriteLinePadding(0)
        serial.setTxBufferSize(200)
        serial.setRxBufferSize(200)
        serial.writeLine("WIFI_CONNECT," + ssid + "," + password)
        while (!(serial.readLine().includes("WIFI_CONNECTED")));
        basic.showIcon(IconNames.Yes)
        basic.pause(1000)
        basic.clearScreen()
        serial.redirectToUSB()
    }

    //% group="Blynk"
    /**
     * Write value to blynk
     */
    //% block="BlynkWrite $pin|Value %value"
    export function BlynkWrite(pin: Virtual_Pin, value: string): void {
        serial.redirect(
            SerialPin.P8,
            SerialPin.P12,
            BaudRate.BaudRate115200
        )
        serial.setWriteLinePadding(0)
        serial.setTxBufferSize(200)
        serial.setRxBufferSize(200)
        serial.writeLine("BLYNK_WRITE,V" + pin + "," + value)
        while (!(serial.readLine().includes("BLYNK_WRITE_SUCCESS")));
        serial.redirectToUSB()
    }

    //% group="Blynk"
    /**
     * Read value from blynk
     */
    //% block="BlynkRead $pin"
    export function BlynkRead(pin: Virtual_Pin) {
        let inputString = ""
        serial.redirect(
            SerialPin.P8,
            SerialPin.P12,
            BaudRate.BaudRate115200
        )
        serial.setWriteLinePadding(0)
        serial.setTxBufferSize(200)
        serial.setRxBufferSize(200)
        serial.writeLine("BLYNK_READ,V" + pin)
        while (inputString.length == 0) {
            inputString = serial.readLine()
        }
        inputString = inputString.split("\"")[1]
        serial.redirectToUSB()
        return inputString
    }

    //% group="Blynk"
    /**
     * Set token blynk
     */
    //% block="SETBlynkToken %token"
    export function SETBlynkToken(token: string): void {
        serial.redirect(
            SerialPin.P8,
            SerialPin.P12,
            BaudRate.BaudRate115200
        )
        serial.setWriteLinePadding(0)
        serial.setTxBufferSize(200)
        serial.setRxBufferSize(200)
        serial.writeLine("BLYNK_SET_TOKEN," + token)
        while (!(serial.readLine().includes("BLYNK_SET_TOKEN_SUCCESS")));
        serial.redirectToUSB()
    }

    //% group="Line Notify"
    /**
     * Send image to line notify
     */
    //% block="LineNotifyImage %url"
    export function LineNotifyImage(url: string): void {
        serial.redirect(
            SerialPin.P8,
            SerialPin.P12,
            BaudRate.BaudRate115200
        )
        serial.setWriteLinePadding(0)
        serial.setTxBufferSize(200)
        serial.setRxBufferSize(200)
        serial.writeLine("LINE_WRITE_PICTURE," + url)
        while (!(serial.readLine().includes("LINE_NOTIFY_SUCCESS")));
        serial.redirectToUSB()
    }

    //% group="Line Notify"
    /**
     * Send string to line notify
     */
    //% block="LineNotifyString %message"
    export function LineNotifyString(message: string): void {
        serial.redirect(
            SerialPin.P8,
            SerialPin.P12,
            BaudRate.BaudRate115200
        )
        serial.setWriteLinePadding(0)
        serial.setTxBufferSize(200)
        serial.setRxBufferSize(200)
        serial.writeLine("LINE_WRITE_STRING," + message)
        while (!(serial.readLine().includes("LINE_NOTIFY_SUCCESS")));
        serial.redirectToUSB()
    }

    //% group="Line Notify"
    /**
     * Set token line notify
     */
    //% block="SETLineToken %token"
    export function SETLineToken(token: string): void {
        serial.redirect(
            SerialPin.P8,
            SerialPin.P12,
            BaudRate.BaudRate115200
        )
        serial.setWriteLinePadding(0)
        serial.setTxBufferSize(200)
        serial.setRxBufferSize(200)
        serial.writeLine("LINE_SET_TOKEN," + token)
        while (!(serial.readLine().includes("LINE_SET_TOKEN_SUCCESS")));
        serial.redirectToUSB()
    }

    //% group="HTTP Method"
    /**
     * HTTP get method
     */
    //% block="HTTP GET %url|Port %port"
    //% port.defl=443
    export function HTTPGet(url: string, port: number) {
        let inputString = ""
        serial.redirect(
            SerialPin.P8,
            SerialPin.P12,
            BaudRate.BaudRate115200
        )
        serial.setWriteLinePadding(0)
        serial.setTxBufferSize(200)
        serial.setRxBufferSize(200)
        serial.writeLine("GET," + url + "," + port)
        while (1) {
            inputString += serial.readString()
            if (inputString.includes("HTTP_GET_SUCCESS")) {
                break
            }
        }
        inputString = inputString.substr(0, inputString.length - 19)
        serial.redirectToUSB()
        return inputString
    }

    //% group="JSON"
    /**
     * Get data from json string
     */
    //% block="GETFromJson %json|Key %find"
    export function GETFromJson(json: string, find: string) {
        let data = json
        let count = 0
        let text_output: string[] = []
        let text_split: string[] = []
        let substring = ""
        let index = 0
        while (true) {
            index = data.indexOf("\"" + find + "\":")
            if (index != -1) {
                substring = data.substr(index + find.length + 3, data.length - index)
                data = substring
                text_split = substring.split(",")
                text_output[count] = text_split[0]
                count += 1
            } else {
                break;
            }
        }
        return text_output
    }

    //% group="Line Follower"
    /**
     * Turn Left or Right Follower Line Mode
     */
    //% block="TurnLINE %turn|Speed\n %speed|Sensor %sensor|Fast Time\n %time|Break Time %break_delay"
    //% speed.min=0 speed.max=100
    //% time.shadow="timePicker"
    //% break_delay.shadow="timePicker"
    //% time.defl=200
    //% break_delay.defl=20
    export function TurnLINE(turn: Turn_Line, speed: number, sensor: number, time: number, break_delay: number) {
        let ADC_PIN = [
            ADC_Read.ADC0,
            ADC_Read.ADC1,
            ADC_Read.ADC2,
            ADC_Read.ADC3,
            ADC_Read.ADC4,
            ADC_Read.ADC5,
            ADC_Read.ADC6,
            ADC_Read.ADC7
        ]
        let on_line = 0
        let adc_sensor_pin = sensor - 1
        // let position = pins.map(sensor, 1, Num_Sensor, 0, (Num_Sensor - 1) * 1000)
        let error = 0
        let timer = 0
        let motor_speed = 0
        let motor_slow = Math.round(speed / 4)
        while (1) {
            on_line = 0
            for (let i = 0; i < Sensor_PIN.length; i++) {
                if ((pins.map(ADCRead(ADC_PIN[Sensor_PIN[i]]), Color_Line[i], Color_Background[i], 1000, 0)) >= 800) {
                    on_line += 1;
                }
            }

            if (on_line == 0) {
                break
            }

            if (turn == Turn_Line.Left) {
                motorGo(-speed, speed)
            }
            else if (turn == Turn_Line.Right) {
                motorGo(speed, -speed)
            }
        }
        timer = control.millis()
        while (1) {
            if ((pins.map(ADCRead(ADC_PIN[Sensor_PIN[adc_sensor_pin]]), Color_Line[adc_sensor_pin], Color_Background[adc_sensor_pin], 1000, 0)) >= 800) {
                basic.pause(break_delay)
                motorStop()
                break
            }
            else {
                error = timer - (control.millis() - time)
                motor_speed = error

                if (motor_speed > 100) {
                    motor_speed = 100
                }
                else if (motor_speed < 0) {
                    motor_speed = motor_slow
                }

                if (turn == Turn_Line.Left) {
                    motorGo(-motor_speed, motor_speed)
                }
                else if (turn == Turn_Line.Right) {
                    motorGo(motor_speed, -motor_speed)
                }
            }
        }
    }

    //% group="Line Follower"
    /**
     * Line Follower Forward Timer
     */
    //% block="Direction %Forward_Direction|Time %time|Min Speed\n\n %base_speed|Max Speed\n\n %max_speed|KP %kp|KD %kd"
    //% min_speed.min=0 min_speed.max=100
    //% max_speed.min=0 max_speed.max=100
    //% time.shadow="timePicker"
    //% time.defl=200
    export function ForwardTIME(direction: Forward_Direction, time: number, min_speed: number, max_speed: number, kp: number, kd: number) {
        let timer = control.millis()
        while (control.millis() - timer < time) {
            error = GETPosition() - (((Num_Sensor - 1) * 1000) / 2)
            P = error
            D = error - previous_error
            PD_Value = (kp * P) + (kd * D)
            previous_error = error

            left_motor_speed = min_speed - PD_Value
            right_motor_speed = min_speed + PD_Value

            if (left_motor_speed > max_speed) {
                left_motor_speed = max_speed
            }
            else if (left_motor_speed < -max_speed) {
                left_motor_speed = -max_speed
            }

            if (right_motor_speed > max_speed) {
                right_motor_speed = max_speed
            }
            else if (right_motor_speed < -max_speed) {
                right_motor_speed = -max_speed
            }

            if (direction == Forward_Direction.Forward) {
                motorGo(left_motor_speed, right_motor_speed)
            }
            else {
                motorGo(-left_motor_speed, -right_motor_speed)
            }
        }
        motorStop()
    }

    //% group="Line Follower"
    /**
     * Line Follower Forward
     */
    //% block="Direction %Forward_Direction|Find %Find_Line|Min Speed\n %base_speed|Max Speed\n %max_speed|Break Time %break_time|KP %kp|KD %kd"
    //% min_speed.min=0 min_speed.max=100
    //% max_speed.min=0 max_speed.max=100
    //% break_time.shadow="timePicker"
    //% break_time.defl=20
    export function ForwardLINE(direction: Forward_Direction, find: Find_Line, min_speed: number, max_speed: number, break_time: number, kp: number, kd: number) {
        let ADC_PIN = [
            ADC_Read.ADC0,
            ADC_Read.ADC1,
            ADC_Read.ADC2,
            ADC_Read.ADC3,
            ADC_Read.ADC4,
            ADC_Read.ADC5,
            ADC_Read.ADC6,
            ADC_Read.ADC7
        ]
        let found_left = 0
        let found_right = 0
        let last_left = 0
        let last_right = 0
        let line_state = 0
        let on_line = 0
        let on_line_LR = 0

        while (1) {
            found_left = 0
            found_right = 0
            on_line = 0
            on_line_LR = 0
            for (let i = 0; i < Sensor_PIN.length; i++) {
                if ((pins.map(ADCRead(ADC_PIN[Sensor_PIN[i]]), Color_Line[i], Color_Background[i], 1000, 0)) >= 800) {
                    on_line += 1;
                }
            }

            for (let i = 0; i < Sensor_Left.length; i++) {
                if ((pins.map(ADCRead(ADC_PIN[Sensor_Left[i]]), Color_Line_Left[i], Color_Background[i], 1000, 0)) >= 800) {
                    on_line_LR += 1;
                }
            }

            for (let i = 0; i < Sensor_Right.length; i++) {
                if ((pins.map(ADCRead(ADC_PIN[Sensor_Right[i]]), Color_Line_Right[i], Color_Background[i], 1000, 0)) >= 800) {
                    on_line_LR += 1;
                }
            }
            if (Sensor_PIN.length <= 2) {
                if (on_line > 0 && on_line <= 2) {
                    error = GETPosition() - (((Num_Sensor - 1) * 1000) / 2)
                    P = error
                    D = error - previous_error
                    PD_Value = (kp * P) + (kd * D)
                    previous_error = error

                    left_motor_speed = min_speed - PD_Value
                    right_motor_speed = min_speed + PD_Value

                    if (left_motor_speed > max_speed) {
                        left_motor_speed = max_speed
                    }
                    else if (left_motor_speed < -max_speed) {
                        left_motor_speed = -max_speed
                    }

                    if (right_motor_speed > max_speed) {
                        right_motor_speed = max_speed
                    }
                    else if (right_motor_speed < -max_speed) {
                        right_motor_speed = -max_speed
                    }

                    if (direction == Forward_Direction.Forward) {
                        motorGo(left_motor_speed, right_motor_speed)
                    }
                    else {
                        motorGo(-left_motor_speed, -right_motor_speed)
                    }
                }
                else {
                    if (direction == Forward_Direction.Forward) {
                        motorGo(min_speed, min_speed)
                    }
                    else {
                        motorGo(-min_speed, -min_speed)
                    }
                }
            }
            else {
                if (on_line > 0 && on_line <= 2 && on_line_LR == 0) {
                    error = GETPosition() - (((Num_Sensor - 1) * 1000) / 2)
                    P = error
                    D = error - previous_error
                    PD_Value = (kp * P) + (kd * D)
                    previous_error = error

                    if (direction == Forward_Direction.Forward) {
                        left_motor_speed = min_speed - PD_Value
                        right_motor_speed = min_speed + PD_Value
                    }
                    else {
                        left_motor_speed = min_speed + PD_Value
                        right_motor_speed = min_speed - PD_Value
                    }

                    if (left_motor_speed > max_speed) {
                        left_motor_speed = max_speed
                    }
                    else if (left_motor_speed < -max_speed) {
                        left_motor_speed = -max_speed
                    }

                    if (right_motor_speed > max_speed) {
                        right_motor_speed = max_speed
                    }
                    else if (right_motor_speed < -max_speed) {
                        right_motor_speed = -max_speed
                    }

                    if (direction == Forward_Direction.Forward) {
                        motorGo(left_motor_speed, right_motor_speed)
                    }
                    else {
                        motorGo(-left_motor_speed, -right_motor_speed)
                    }
                }
                else {
                    if (direction == Forward_Direction.Forward) {
                        motorGo(min_speed, min_speed)
                    }
                    else {
                        motorGo(-min_speed, -min_speed)
                    }
                }
            }

            if (line_state == 0) {
                for (let i = 0; i < Sensor_Left.length; i++) {
                    if ((pins.map(ADCRead(ADC_PIN[Sensor_Left[i]]), Color_Line_Left[i], Color_Background[i], 1000, 0)) >= 800) {
                        found_left += 1;
                    }
                }

                for (let i = 0; i < Sensor_Right.length; i++) {
                    if ((pins.map(ADCRead(ADC_PIN[Sensor_Right[i]]), Color_Line_Right[i], Color_Background[i], 1000, 0)) >= 800) {
                        found_right += 1;
                    }
                }

                if (found_left == Sensor_Left.length || found_right == Sensor_Right.length) {
                    line_state = 1
                }
            }
            else if (line_state == 1) {
                for (let i = 0; i < Sensor_Left.length; i++) {
                    if ((pins.map(ADCRead(ADC_PIN[Sensor_Left[i]]), Color_Line_Left[i], Color_Background[i], 1000, 0)) >= 800) {
                        found_left += 1;
                        if (last_left != Sensor_Left.length) {
                            last_left = found_left
                        }
                    }
                }

                for (let i = 0; i < Sensor_Right.length; i++) {
                    if ((pins.map(ADCRead(ADC_PIN[Sensor_Right[i]]), Color_Line_Right[i], Color_Background[i], 1000, 0)) >= 800) {
                        found_right += 1;
                        if (last_right != Sensor_Right.length) {
                            last_right = found_right
                        }
                    }
                }

                if (found_left != Sensor_Left.length && found_right != Sensor_Right.length) {
                    line_state = 2
                }
            }

            else if (line_state == 2) {
                if (find == Find_Line.Left) {
                    if (last_left == Sensor_Left.length && last_right != Sensor_Right.length) {
                        if (direction == Forward_Direction.Forward) {
                            motorGo(-100, -100)
                        }
                        else {
                            motorGo(100, 100)
                        }
                        basic.pause(break_time)
                        motorStop()
                        break
                    }
                    else {
                        last_left = 0
                        last_right = 0
                        line_state = 0
                    }
                }
                else if (find == Find_Line.Center) {
                    if (last_left == Sensor_Left.length && last_right == Sensor_Right.length) {
                        if (direction == Forward_Direction.Forward) {
                            motorGo(-100, -100)
                        }
                        else {
                            motorGo(100, 100)
                        }
                        basic.pause(break_time)
                        motorStop()
                        break
                    }
                    else {
                        last_left = 0
                        last_right = 0
                        line_state = 0
                    }
                }
                else if (find == Find_Line.Right) {
                    if (last_left != Sensor_Left.length && last_right == Sensor_Right.length) {
                        if (direction == Forward_Direction.Forward) {
                            motorGo(-100, -100)
                        }
                        else {
                            motorGo(100, 100)
                        }
                        basic.pause(break_time)
                        motorStop()
                        break
                    }
                    else {
                        last_left = 0
                        last_right = 0
                        line_state = 0
                    }
                }
            }
        }
    }

    //% group="Line Follower"
    /**
     * Basic Line Follower
     */
    //% block="Min Speed %base_speed|Max Speed %max_speed|KP %kp|KD %kd"
    //% min_speed.min=0 min_speed.max=100
    //% max_speed.min=0 max_speed.max=100
    export function Follower(min_speed: number, max_speed: number, kp: number, kd: number) {
        error = GETPosition() - (((Num_Sensor - 1) * 1000) / 2)
        P = error
        D = error - previous_error
        PD_Value = (kp * P) + (kd * D)
        previous_error = error

        left_motor_speed = min_speed - PD_Value
        right_motor_speed = min_speed + PD_Value

        if (left_motor_speed > max_speed) {
            left_motor_speed = max_speed
        }
        else if (left_motor_speed < -max_speed) {
            left_motor_speed = -max_speed
        }

        if (right_motor_speed > max_speed) {
            right_motor_speed = max_speed
        }
        else if (right_motor_speed < -max_speed) {
            right_motor_speed = -max_speed
        }

        motorGo(left_motor_speed, right_motor_speed)
    }

    //% group="Line Follower"
    /**
     * Get Position Line
     */
    //% block="GETPosition"
    export function GETPosition() {
        let ADC_PIN = [
            ADC_Read.ADC0,
            ADC_Read.ADC1,
            ADC_Read.ADC2,
            ADC_Read.ADC3,
            ADC_Read.ADC4,
            ADC_Read.ADC5,
            ADC_Read.ADC6,
            ADC_Read.ADC7
        ]
        let Average = 0
        let Sum_Value = 0
        let ON_Line = 0

        for (let i = 0; i < Num_Sensor; i++) {
            let Value_Sensor = 0;
            if (Line_Mode == 0) {
                Value_Sensor = pins.map(ADCRead(ADC_PIN[Sensor_PIN[i]]), Color_Line[i], Color_Background[i], 1000, 0)
                if (Value_Sensor < 0) {
                    Value_Sensor = 0
                }
                else if (Value_Sensor > 1000) {
                    Value_Sensor = 1000
                }
            }
            else {
                Value_Sensor = pins.map(ADCRead(ADC_PIN[Sensor_PIN[i]]), Color_Background[i], Color_Line[i], 1000, 0)
                if (Value_Sensor < 0) {
                    Value_Sensor = 0
                }
                else if (Value_Sensor > 1000) {
                    Value_Sensor = 1000
                }
            }
            if (Value_Sensor > 200) {
                ON_Line = 1;
                Average += Value_Sensor * (i * 1000)
                Sum_Value += Value_Sensor
            }
        }
        if (ON_Line == 0) {
            if (Last_Position < (Num_Sensor - 1) * 1000 / 2) {
                return (Num_Sensor - 1) * 1000
            }
            else {
                return 0
            }
        }
        Last_Position = Average / Sum_Value;
        return Math.round(((Num_Sensor - 1) * 1000) - Last_Position)
    }

    //% group="Line Follower"
    /**
     * Set Line Sensor Pin
     */
    //% block="LINESensorSET $adc_pin|Sensor Left\n\n $sensor_left|Sensor Right\n $sensor_right|ON OFF Sensor $led_pin"
    export function LINESensorSET(adc_pin: number[], sensor_left: number[], sensor_right: number[], led_pin: LED_Pin): void {
        Sensor_PIN = adc_pin
        Sensor_Left = sensor_left
        Sensor_Right = sensor_right
        Num_Sensor = Sensor_PIN.length
        LED_PIN = led_pin

        for (let i = 0; i < Num_Sensor; i++) {
            Color_Line[i] = Line_HIGH[Sensor_PIN[i]]
            Color_Background[i] = Line_LOW[Sensor_PIN[i]]
        }
        for (let i = 0; i < Sensor_Left.length; i++) {
            Color_Line_Left[i] = Line_HIGH[Sensor_Left[i]]
            Color_Background_Left[i] = Line_LOW[Sensor_Left[i]]
        }
        for (let i = 0; i < Sensor_Right.length; i++) {
            Color_Line_Right[i] = Line_HIGH[Sensor_Right[i]]
            Color_Background_Right[i] = Line_LOW[Sensor_Right[i]]
        }
    }

    //% group="Line Follower"
    /**
     * Calibrate Sensor
     */
    //% block="SensorCalibrate $adc_pin"
    export function SensorCalibrate(adc_pin: number[]): void {
        let ADC_PIN = [
            ADC_Read.ADC0,
            ADC_Read.ADC1,
            ADC_Read.ADC2,
            ADC_Read.ADC3,
            ADC_Read.ADC4,
            ADC_Read.ADC5,
            ADC_Read.ADC6,
            ADC_Read.ADC7
        ]
        let _Sensor_PIN = adc_pin
        let _Num_Sensor = _Sensor_PIN.length
        let Line_Cal = [0, 0, 0, 0, 0, 0, 0, 0]
        let Background_Cal = [0, 0, 0, 0, 0, 0, 0, 0]

        music.playTone(587, music.beat(BeatFraction.Quarter))
        music.playTone(784, music.beat(BeatFraction.Quarter))
        ////Calibrate Follower Line
        while (!input.buttonIsPressed(Button.A));
        music.playTone(784, music.beat(BeatFraction.Quarter))
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < _Num_Sensor; j++) {
                Line_Cal[j] += ADCRead(ADC_PIN[_Sensor_PIN[j]])
            }
            basic.pause(50)
        }
        for (let i = 0; i < _Num_Sensor; i++) {
            Line_Cal[i] = Line_Cal[i] / 20
            for (let j = 0; j < 8; j++) {
                if (_Sensor_PIN[i] == j) {
                    Line_HIGH[j] = Line_Cal[i]
                }
            }
        }
        music.playTone(784, music.beat(BeatFraction.Quarter))

        ////Calibrate Background
        while (!input.buttonIsPressed(Button.A));
        music.playTone(784, music.beat(BeatFraction.Quarter))
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < _Num_Sensor; j++) {
                Background_Cal[j] += ADCRead(ADC_PIN[_Sensor_PIN[j]])
            }
            basic.pause(50)
        }
        for (let i = 0; i < _Num_Sensor; i++) {
            Background_Cal[i] = Background_Cal[i] / 20
            for (let j = 0; j < 8; j++) {
                if (_Sensor_PIN[i] == j) {
                    Line_LOW[j] = Background_Cal[i]
                }
            }
        }
        music.playTone(784, music.beat(BeatFraction.Quarter))
        music.playTone(587, music.beat(BeatFraction.Quarter))
    }

    //% group="Tools"
    /**
     * Check Firmware Version
     */
    //% block="versionFirmware"
    export function versionFirmware() {
        let inputString = ""
        serial.redirect(
            SerialPin.P8,
            SerialPin.P12,
            BaudRate.BaudRate115200
        )
        serial.setWriteLinePadding(0)
        serial.setTxBufferSize(200)
        serial.setRxBufferSize(200)
        serial.writeLine("CHECK_FIRMWARE")
        while (inputString.length == 0) {
            inputString = serial.readLine()
        }
        serial.redirectToUSB()
        return "v" + inputString
    }

    //% group="Tools"
    /**
     * Update Firmware
     */
    //% block="updateFirmware"
    export function updateFirmware() {
        let inputString = ""
        serial.redirect(
            SerialPin.P8,
            SerialPin.P12,
            BaudRate.BaudRate115200
        )
        serial.setWriteLinePadding(0)
        serial.setTxBufferSize(200)
        serial.setRxBufferSize(200)
        serial.writeLine("UPDATE_FIRMWARE")
        while (inputString.length == 0) {
            inputString = serial.readLine()
        }
        while (1) {
            if (inputString.includes("LATEST_FIRMWARE")) {
                basic.showIcon(IconNames.Happy)
                basic.pause(1000)
                basic.clearScreen()
                serial.redirectToUSB()
                serial.writeLine("Latest Firmware")
                break
            }
            else if (inputString.includes("NEW_FIRMWARE")) {
                while (!(serial.readLine().includes("START_IOT_MODULE")));
                basic.showIcon(IconNames.Happy)
                basic.pause(1000)
                basic.clearScreen()
                serial.redirectToUSB()
                serial.writeLine("Update Firmware Success")
                break
            }
            else {
                basic.showIcon(IconNames.Sad)
                basic.pause(1000)
                basic.clearScreen()
                break
            }
        }
    }
}