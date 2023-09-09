import React, { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';

import { Space } from 'antd';
import './StrengthMeter.css';

export default function StrengthMeter({ password, name, email, date }) {

    useEffect(() => {
        const updatedUserInputs = [name, email, date].filter((input) => input.trim() !== '');
        setUserInputs(updatedUserInputs);
    }, [name, email, date]);


    const [userInputs, setUserInputs] = useState([]);
    const createPasswordLabel = (result) => {
        switch (result.score) {
            case 0:
                return 'Weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return 'Weak';
        }
    };


    if (password.length == 0) return;
    console.log('userInputs', userInputs);
    const result = zxcvbn(password, userInputs);

    console.log('result', result);

    return (
        <div className="password-strength-meter">
            <Space direction='vertical'>
                <label
                    className="password-strength-meter-label"
                >
                    {password && (
                        <>
                            <strong>Password strength:</strong> {createPasswordLabel(result)}
                        </>
                    )}
                </label>
                <progress
                    className={`password-strength-meter-progress strength-${createPasswordLabel(result)}`}
                    value={result.score}
                    max="4"
                />
                <div>
                    <p>Password: {result.password}</p>
                    <p>Guesses: {result.guesses}</p>
                    <p>Guesses (log10): {result.guesses_log10}</p>
                    <p>Calculation Time: {result.calc_time} seconds</p>
                    <p>Score: {result.score}</p>
                    <p>Feedback: {result.feedback.warning}</p>
                    <ul>
                        {result.feedback.suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                        ))}
                    </ul>
                    <p>Crack Times:</p>
                    <ul>
                        <li>Online Throttling (100 per hour): {result.crack_times_display.online_throttling_100_per_hour}</li>
                        <li>Online (no throttling, 10 per second): {result.crack_times_display.online_no_throttling_10_per_second}</li>
                        <li>Offline Slow Hashing (1e4 per second): {result.crack_times_display.offline_slow_hashing_1e4_per_second}</li>
                        <li>Offline Fast Hashing (1e10 per second): {result.crack_times_display.offline_fast_hashing_1e10_per_second}</li>
                    </ul>

                    <p>Sequence:</p>
                    <ul>
                        {result.sequence.map((item, index) => (
                            <li key={index}>
                                <p>Pattern: {item.pattern}</p>
                                <p>Token: {item.token}</p>
                                <p>Guesses: {item.guesses}</p>
                                <p>Guesses (log10): {item.guesses_log10}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </Space>
        </div>
    );
}