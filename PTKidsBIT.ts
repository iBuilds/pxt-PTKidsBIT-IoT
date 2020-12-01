/**
 * Functions are mapped to blocks using various macros
 * 
 * in comments starting with %. The most important macro
 * 
 * is "block", and it specifies that a block should be
 * 
 * generated for an **exported** function.
 */
let right_motor_speed = 0
let left_motor_speed = 0
let PD_Value = 0
let previous_error = 0
let D = 0
let P = 0
let error = 0
let Last_Position = 0
let Line_Mode = 0
let Color_Background_Right: number[] = []
let Color_Line_Right: number[] = []
let Color_Background_Left: number[] = []
let Color_Line_Left: number[] = []
let Color_Background: number[] = []
let Color_Line: number[] = []
let LED_PIN = 0
let Num_Sensor = 0
let Sensor_Right: number[] = []
let Sensor_Left: number[] = []
let Sensor_PIN: number[] = []
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
    //% block="P8"
    P8,
    //% block="P12"
    P12
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
namespace PTKidsBIT {
	//% group="Motor Control"
    /**
     * Stop all Motor
     */
    //% block="Motor Stop"
    export function motorStop():void {
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
        if (servo == Servo_Write.P8) {
            pins.servoWritePin(AnalogPin.P8, degree)
        }
        else if (servo == Servo_Write.P12) {
            pins.servoWritePin(AnalogPin.P12, degree)
        }
    }

    //% group="ADC and Sensor"
    /**
     * Read Analog from ADC Channel
     */
    //% block="ADCRead %ADC_Read"
    export function ADCRead(ADCRead:ADC_Read): number { 
        pins.i2cWriteNumber(0x48, ADCRead, NumberFormat.UInt8LE, false)
        return ADCRead = pins.i2cReadNumber(0x48, NumberFormat.UInt16BE, false)      
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
        let position = pins.map(sensor, 1, Num_Sensor, 0, (Num_Sensor - 1) * 1000)
        let error2 = 0
        let timer = 0
        let motor_speed = 0
        let motor_slow = Math.round(speed / 5)
        while (1) {
            on_line = 0
            for (let i = 0; i < Sensor_PIN.length; i ++) {
                if ((pins.map(ADCRead(ADC_PIN[Sensor_PIN[i]]), Color_Line[i], Color_Background[i], 1000, 0)) >= 800) {
                    on_line += 1;
                }
            }

            if (on_line == 0) {
                break
            }

            if (turn == Turn_Line.Left) {
                motorGo(speed, -speed)
            }
            else if (turn == Turn_Line.Right) {
                motorGo(-speed, speed)
            }
        }
        timer = control.millis()
        while (1) {
            if ((Math.abs(position - GETPosition())) <= 100) {
                basic.pause(break_delay)
                motorStop()
                break
            }
            else {
                error2 = timer - (control.millis() - time)
                motor_speed = error2

                if (motor_speed > 100) {
                    motor_speed = 100
                }
                else if (motor_speed < 0) {
                    motor_speed = motor_slow
                }

                if (turn == Turn_Line.Left) {
                    motorGo(motor_speed, -motor_speed)
                }
                else if (turn == Turn_Line.Right) {
                    motorGo(-motor_speed, motor_speed)
                }
            }
        }
    }

    //% group="Line Follower"
    /**
     * Line Follower Forward Timer
     */
    //% block="ForwardTIME %time|Min Speed\n\n %base_speed|Max Speed\n\n %max_speed|KP %kp|KD %kd"
    //% min_speed.min=0 min_speed.max=100
    //% max_speed.min=0 max_speed.max=100
    //% time.shadow="timePicker"
    //% time.defl=200
    export function ForwardTIME(time: number, min_speed: number, max_speed: number, kp: number, kd: number) {
        let timer2 = control.millis()
        while (control.millis() - timer2 < time) {
            error = GETPosition() - (((Num_Sensor - 1) * 1000) / 2)
            P = error
            D = error - previous_error
            PD_Value = (kp * P) + (kd * D)
            previous_error = error

            left_motor_speed = min_speed + PD_Value
            right_motor_speed = min_speed - PD_Value

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
        motorStop()
    }

    //% group="Line Follower"
    /**
     * Line Follower Forward
     */
    //% block="ForwardFIND %Find_Line|Min Speed\n %base_speed|Max Speed\n %max_speed|Break Time %break_time|KP %kp|KD %kd"
    //% min_speed.min=0 min_speed.max=100
    //% max_speed.min=0 max_speed.max=100
    //% break_time.shadow="timePicker"
    //% break_time.defl=20
    export function ForwardLINE(find: Find_Line, min_speed: number, max_speed: number, break_time: number, kp: number, kd: number) {
        let ADC_PIN2 = [
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
        let on_line2 = 0
        let on_line_LR = 0

        while (1) {
            found_left = 0
            found_right = 0
            on_line2 = 0
            on_line_LR = 0
            for (let j = 0; j < Sensor_PIN.length; j ++) {
                if ((pins.map(ADCRead(ADC_PIN2[Sensor_PIN[j]]), Color_Line[j], Color_Background[j], 1000, 0)) >= 800) {
                    on_line2 += 1;
                }
            }

            for (let k = 0; k < Sensor_Left.length; k ++) {
                if ((pins.map(ADCRead(ADC_PIN2[Sensor_Left[k]]), Color_Line_Left[k], Color_Background[k], 1000, 0)) >= 800) {
                    on_line_LR += 1;
                }
            }

            for (let l = 0; l < Sensor_Right.length; l ++) {
                if ((pins.map(ADCRead(ADC_PIN2[Sensor_Right[l]]), Color_Line_Right[l], Color_Background[l], 1000, 0)) >= 800) {
                    on_line_LR += 1;
                }
            }
            if (on_line2 > 0 && on_line2 <= 2 && on_line_LR == 0) {
                error = GETPosition() - (((Num_Sensor - 1) * 1000) / 2)
                P = error
                D = error - previous_error
                PD_Value = (kp * P) + (kd * D)
                previous_error = error

                left_motor_speed = min_speed + PD_Value
                right_motor_speed = min_speed - PD_Value

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
            else {
                motorGo(min_speed, min_speed)
            }

            if (line_state == 0) {
                for (let m = 0; m < Sensor_Left.length; m ++) {
                    if ((pins.map(ADCRead(ADC_PIN2[Sensor_Left[m]]), Color_Line_Left[m], Color_Background[m], 1000, 0)) >= 800) {
                        found_left += 1;
                    }
                }

                for (let n = 0; n < Sensor_Right.length; n ++) {
                    if ((pins.map(ADCRead(ADC_PIN2[Sensor_Right[n]]), Color_Line_Right[n], Color_Background[n], 1000, 0)) >= 800) {
                        found_right += 1;
                    }
                }

                if (found_left == Sensor_Left.length || found_right == Sensor_Right.length) {
                    line_state = 1
                }
            }
            else if (line_state == 1) {
                for (let o = 0; o < Sensor_Left.length; o ++) {
                    if ((pins.map(ADCRead(ADC_PIN2[Sensor_Left[o]]), Color_Line_Left[o], Color_Background[o], 1000, 0)) >= 800) {
                        found_left += 1;
                        if (last_left != Sensor_Left.length) {
                            last_left = found_left
                        }
                    }
                }

                for (let p = 0; p < Sensor_Right.length; p ++) {
                    if ((pins.map(ADCRead(ADC_PIN2[Sensor_Right[p]]), Color_Line_Right[p], Color_Background[p], 1000, 0)) >= 800) {
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
                        motorGo(-100, -100)
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
                        motorGo(-100, -100)
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
                        motorGo(-100, -100)
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
     * Get Position Line
     */
    //% block="GETPosition"
    export function GETPosition() {
        let ADC_PIN3 = [
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

        for (let q = 0; q < Num_Sensor; q ++) {
            let Value_Sensor = 0;
            if (Line_Mode == 0) {
                Value_Sensor = pins.map(ADCRead(ADC_PIN3[Sensor_PIN[q]]), Color_Line[q], Color_Background[q], 1000, 0)
                if (Value_Sensor < 0) {
                    Value_Sensor = 0
                }
                else if (Value_Sensor > 1000) {
                    Value_Sensor = 1000
                }
            }
            else {
                Value_Sensor = pins.map(ADCRead(ADC_PIN3[Sensor_PIN[q]]), Color_Background[q], Color_Line[q], 1000, 0)
                if (Value_Sensor < 0) {
                    Value_Sensor = 0
                }
                else if (Value_Sensor > 1000) {
                    Value_Sensor = 1000
                }
            }
            if (Value_Sensor > 200) {
                ON_Line = 1;
                Average += Value_Sensor * (q * 1000)
                Sum_Value += Value_Sensor
            }
        }
        if (ON_Line == 0){
            if (Last_Position < (Num_Sensor - 1) * 1000 / 2){
                return (Num_Sensor - 1) * 1000
            }
            else{
                return 0
            }
        }
        Last_Position = Average / Sum_Value;
        return Math.round(((Num_Sensor - 1) * 1000) - Last_Position)
    }

    //% group="Line Follower"
    /**
     * Calibrate Line Sensor
     */
    //% block="LINECalibrate"
    export function LINECalibrate():void {
        let ADC_PIN4 = [ 
                ADC_Read.ADC0,
                ADC_Read.ADC1,
                ADC_Read.ADC2,
                ADC_Read.ADC3,
                ADC_Read.ADC4,
                ADC_Read.ADC5,
                ADC_Read.ADC6,
                ADC_Read.ADC7
            ]
        let Line_Cal = [0, 0, 0, 0, 0, 0, 0, 0]
        let Line_Cal_L = [0, 0, 0, 0, 0, 0, 0, 0]
        let Line_Cal_R = [0, 0, 0, 0, 0, 0, 0, 0]
        let Background_Cal = [0, 0, 0, 0, 0, 0, 0, 0]

        music.playTone(587, music.beat(BeatFraction.Quarter))
        music.playTone(784, music.beat(BeatFraction.Quarter))
        ////Calibrate Follower Line
        while (!input.buttonIsPressed(Button.A));
        music.playTone(784, music.beat(BeatFraction.Quarter))
        for (let r = 0; r < 20; r ++) {
            for (let s = 0; s < Num_Sensor; s ++) {
                Line_Cal[s] += ADCRead(ADC_PIN4[Sensor_PIN[s]])
            }
            basic.pause(50)
        }
        for (let t = 0; t < Num_Sensor; t ++) {
            Line_Cal[t] = Line_Cal[t] / 20
            Color_Line[t] = Line_Cal[t]
        }

        music.playTone(784, music.beat(BeatFraction.Quarter))
        ////Calibrate LR Line
        while (!input.buttonIsPressed(Button.A));
        music.playTone(784, music.beat(BeatFraction.Quarter))
        for (let u = 0; u < 20; u ++) {
            for (let v = 0; v < Sensor_Left.length; v ++) {
                Line_Cal_L[v] += ADCRead(ADC_PIN4[Sensor_Left[v]])
            }
            for (let w = 0; w < Sensor_Right.length; w ++) {
                Line_Cal_R[w] += ADCRead(ADC_PIN4[Sensor_Right[w]])
            }
            basic.pause(50)
        }
        for (let a = 0; a < Sensor_Left.length; a ++) {
            Line_Cal_L[a] = Line_Cal_L[a] / 20
            Color_Line_Left[a] = Line_Cal_L[a]
        }
        for (let b = 0; b < Sensor_Right.length; b ++) {
            Line_Cal_R[b] = Line_Cal_R[b] / 20
            Color_Line_Right[b] = Line_Cal_R[b]
        }

        music.playTone(784, music.beat(BeatFraction.Quarter))
        ////Calibrate Background
        while (!input.buttonIsPressed(Button.A));
        music.playTone(784, music.beat(BeatFraction.Quarter))
        for (let c = 0; c < 20; c ++) {
            for (let d = 0; d < Num_Sensor; d ++) {
                Background_Cal[d] += ADCRead(ADC_PIN4[Sensor_PIN[d]])
            }
            basic.pause(50)
        }
        for (let e = 0; e < Num_Sensor; e ++) {
            Background_Cal[e] = Background_Cal[e] / 20
            Color_Background[e] = Background_Cal[e]
        }
        music.playTone(784, music.beat(BeatFraction.Quarter))
        music.playTone(587, music.beat(BeatFraction.Quarter))
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
    }
}
