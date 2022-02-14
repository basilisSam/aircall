import {
    jest, it, afterEach, expect, beforeEach
} from '@jest/globals';
import {getAuthorization, login, logout} from "./login";


beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue({access_token: "aToken", refresh_token: "aRefreshToken"})
    })
});

afterEach(() => {
    jest.restoreAllMocks();
});

it('should set access_token & refresh_token to the sessionStorage', async () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');

    await login("someUsername", "somePassword", jest.fn());

    expect(sessionStorage.setItem).toHaveBeenCalledTimes(2);
    expect(sessionStorage.setItem).toHaveBeenCalledWith("jwt", "aToken");
    expect(sessionStorage.setItem).toHaveBeenCalledWith('refreshToken', "aRefreshToken");
});

it('should clear session storage', () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'clear');
    logout(jest.fn());
    expect(sessionStorage.clear).toHaveBeenCalledTimes(1);
});

it('should retrieve accessToken', () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
    getAuthorization();
    expect(sessionStorage.getItem).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getItem).toHaveBeenCalledWith('jwt');
});

