function EventHandler(arr)
{
    this.array = arr;
    
    this.getEventsBetweenDates = function(start, end)
    {
        var startDate = new Date(start).getTime();
        var endDate = new Date(end).getTime();
        var result = [];

        result = this.array.filter(function(element)
        {
            var sDate = new Date(element.dateStart).getTime();
            var eDate = new Date(element.dateEnd).getTime();
            return (startDate <= sDate && endDate >= eDate);
        });

        return result;
    }

    this.getByMonth = function(month)
    {
        var result = [];

        result = this.array.filter(function(element)
        {
            var sDate = new Date(element.dateStart).getMonth() + 1;
            return (sDate == month);
        });

        return result;
    }

    this.getUniqueDateAndSort = function()
    {
        var temp = [];
        var startDateArr = [];
        var endDateArr = [];

        temp = this.array.map(function(element)
        {
            if (!startDateArr.includes(element.dateStart) || !endDateArr.includes(element.dateEnd))
            {
                startDateArr.push(element.dateStart);
                endDateArr.push(element.dateEnd);
                return element;
            }
        });

        var result = temp.filter(function(element)
        {
            return element != null;
        });

        result.sort(sortMonth());

        return result;
    }

    function sortMonth() 
    {
        return function(a, b) 
        {
            var sD = new Date(a.dateStart);
            var eD = new Date(b.dateStart);
            return (sD > eD) - (sD < eD)
        };
    }

    this.getSummary = function()
    {
        var result = Array();

        if (arguments.length == 0)
        {
            result = this.array.map(function(element)
            {
                return toString(element);
            });
        }

        else if (arguments.length == 1)
        {
            if (Array.isArray(arguments[0]))
            {
                var temp = arguments[0];

                result = temp.map(function(element)
                {
                    return toString(element);
                });
            }

            else
            {
                result.push(toString(arguments[0]))
            }
        }

        else if (arguments.length > 1)
        {
            var object = Array.from(arguments);
            result = object.map(function(element)
            {
                return toString(element);
            });
        }

        return result;
    }

    function toString(object)
    {
        var result;

        if (object.dateStart == object.dateEnd)
        {
            result = "On " + object.dateStart + ": " + object.name + " (" + object.description + ")"
        }
        else
        {
            result = "From " + object.dateStart + " to " + object.dateEnd + ": " + object.name + " (" + object.description + ")"
        }

        return result;
    }    
}

Array.prototype.getEventsBetweenDates = function()
{
    return new EventHandler(this).getEventsBetweenDates();
}

Array.prototype.getByMonth = function()
{
    return new EventHandler(this).getByMonth();
}

Array.prototype.getSummary = function()
{
    return new EventHandler(this).getSummary();
}

Array.prototype.getUniqueDateAndSort = function()
{
    return new EventHandler(this).getUniqueDateAndSort();
}