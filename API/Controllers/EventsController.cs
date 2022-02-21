using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Events;

namespace API.Controllers
{
    public class EventsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateEvent(Event newEvent)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Event = newEvent }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditEvent(Guid id, Event newEvent)
        {
            newEvent.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Event = newEvent }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
