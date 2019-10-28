package finalProject.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class ConflictError extends RuntimeException{

    public ConflictError(String message) {
        super(message);

    }
}
