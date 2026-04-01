export class TicketInfo {
    private _departStation: string;
    private _arriveStation: string;
    private _departDate: string;
    private _seatType: string
    private _ticketAmount: string;

    constructor(departStation: string, arriveStation: string, departDate: string, seatType: string, ticketAmount: string){
        this._departStation = departStation
        this._arriveStation = arriveStation
        this._departDate = departDate
        this._seatType = seatType
        this._ticketAmount = ticketAmount
    }

    get departStation(): string {
        return this._departStation
    }
    get departDate(): string {
        return this._departDate
    }
    get arriveStation(): string {
        return this._arriveStation
    }
    get seatType(): string {
        return this._seatType
    }
    get ticketAmount(): string {
        return this._ticketAmount
    }

    set departStation(value: string){
        this._departStation = value
    }
    set departDate(value: string){
        this._departDate = value
    }
    set arriveStation(value: string){
        this._arriveStation = value
    }
    set seatType(value: string){
        this._seatType = value
    }
    set ticketAmount(value: string){
        this._ticketAmount = value
    }
}