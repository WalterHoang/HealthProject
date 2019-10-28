package finalProject.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.SERVICE_UNAVAILABLE, reason = "The Database is not available, please try again later or contact the administrator of this api.")
public class ServiceUnavailable extends RuntimeException {
}
