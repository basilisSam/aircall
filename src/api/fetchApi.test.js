import {handleResponse} from "./fetchApi";

afterEach(() => {
    jest.clearAllMocks();
});

it('returns the response when response is ok', async () => {
    const mockResponse = {
        ok: true,
        json: () => Promise.resolve('response')
    };

    const response = await handleResponse(mockResponse);
    expect(response).toBe('response');
});

it('throws response when status is 401', () => {
    const mockResponse = { "status": 401 };
    try {
        handleResponse(mockResponse);
    } catch (error) {
        expect(error).toEqual(mockResponse);
    }
});

it('throws error if response is not ok or 401', () => {
    const mockResponse = {
        text: () => 'text'
    };

    expect(() => handleResponse(mockResponse)).toThrow('text');
});