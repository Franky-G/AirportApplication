
ckage com.tco.requests;

import com.tco.misc.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Map;

public class RequestDistance extends RequestHeader {

    private Map <String,String> place1;
    private Map <String,String> place2;
    private Double earthRadius;
    private Long distance;
    private final transient Logger log = LoggerFactory.getLogger(RequestConfig.class);

    public RequestDistance() {
        this.requestType = "distance";
        this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
        this.earthRadius = 3959.00;

    }

    @Override
    public void buildResponse() {
        log.trace("buildResponse -> {}", this);
    }
}
